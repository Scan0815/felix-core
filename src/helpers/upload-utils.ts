import {Credentials} from '../interfaces/credentials';
import {ITransfer} from '../interfaces/transfer';
import {UniqueID} from './string-utils';

const ActiveUploadConnections = {};
const BYTES_PER_CHUNK = 1024 * 1024 * 4;

//const WAIT_TIME_TO_UPLOAD_AGAIN = 2000;
let Loaded = 0;
let Total = 0;

export async function UploadChunk(url, credentials: Credentials, file, chunkId, progressHandler) {
  return new Promise((resolve, reject) => {
    const xhr = ActiveUploadConnections[chunkId] = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('x-auth-resource', credentials.resource);
    xhr.setRequestHeader('x-auth-token', credentials.token);
    xhr.withCredentials = true;
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        delete ActiveUploadConnections[chunkId];
        let responseJson;
        try {
          responseJson = JSON.parse(xhr.responseText)
        } catch (e) {
          responseJson = null;
        }
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(responseJson);
        } else {
          if (xhr.status === 400) {
            reject(responseJson);
          } else {
            reject(responseJson);
          }
        }
      }
    };

    if (xhr.upload) {
      xhr.upload.onprogress = (_e) => {
        if (progressHandler) {
          progressHandler(Loaded, Total);
        }
      };
    }

    xhr.onabort = () => {
      delete ActiveUploadConnections[chunkId];
      reject(new Error("Upload canceled by user"));
    };

    xhr.send(file);
  });
}

export async function InitChunkUpload(url,
                                      credentials: Credentials,
                                      transfers: ITransfer[],
                                      responseHandler = null,
                                      progressHandler = null,
                                      errorHandler = null) {
  Loaded = 0;
  Total = 0;
  let chunkCountOverAll = 0;
  const chunkQueue = [];
  const transfersArray = transfers;
  transfersArray.forEach((transfer, transferKey) => {
    const blob = transfer.file;
    const SIZE = blob.size;
    const chunkCount = Math.ceil(SIZE / BYTES_PER_CHUNK);
    for (let index = 0; index < chunkCount; index++) {
      chunkQueue.push({
        id: chunkCountOverAll,
        start: index * BYTES_PER_CHUNK,
        end: Math.min(index * BYTES_PER_CHUNK + BYTES_PER_CHUNK, SIZE),
        size: SIZE,
        transferKey: transferKey,
        chunkCount: chunkCount
      });
      ++chunkCountOverAll;
    }
    Total = chunkCountOverAll;
  });

  await ProcessNextChunk(
    url,
    credentials,
    chunkQueue.reverse(),
    transfersArray,
    responseHandler,
    progressHandler,
    errorHandler);
}

export async function ProcessNextChunk(url,
                                       credentials: Credentials,
                                       chunkQueue,
                                       transfers: ITransfer[],
                                       responseHandler: (response: any) => void,
                                       progressHandler: (loaded: any, total: any) => void,
                                       errorHandler: (error: any) => void,
                                       maxActiveConnections = 2) {
  const activeConnections = Object.keys(ActiveUploadConnections).length;

  if (activeConnections >= maxActiveConnections) {
    return;
  }

  if (!chunkQueue.length) {
    return;
  }

  const chunkQueueItem = chunkQueue.pop();
  console.log('ProcessNextChunk', chunkQueueItem);
  const transferFile = transfers[chunkQueueItem.transferKey];
  const isFile = transferFile.hasOwnProperty('name');
  const chunk = transferFile.file.slice(chunkQueueItem.start, chunkQueueItem.end);

  const formData: FormData = new FormData();
  formData.append('chunk', chunk, (isFile) ? transferFile.file['name'] : UniqueID());
  formData.append('chunkSizeStart', chunkQueueItem.start.toString());
  formData.append('chunkSizeEnd', chunkQueueItem.end.toString());
  formData.append('chunkCount', chunkQueueItem.chunkCount.toString());
  formData.append('fileSize', chunkQueueItem.size.toString());
  formData.append('fileType', transferFile.file.type.toString());
  formData.append('guid', transferFile.guid);
  formData.append('transferId', transferFile.transferId);

  if (transferFile.exIf) {
    formData.append('exIf', JSON.stringify(transferFile.exIf));
  }

  await UploadChunk(url, credentials, formData, chunkQueueItem.id, progressHandler)
    .then((response: any) => {
      ++Loaded;
      if (responseHandler) {
        responseHandler(response);
      }
      delete transferFile.exIf;
    }).catch((error) => {
      if (error?.hasOwnProperty('systemCode') && (
        error.systemCode === 'inputdatanotvalid'
        || error.systemCode === 'uploadexception')) {
        if (errorHandler) {
          errorHandler(error);
        }
      } else {
        if (errorHandler) {
          errorHandler(null);
        }
      }
    });
  await ProcessNextChunk(url, credentials, chunkQueue, transfers, responseHandler, progressHandler, errorHandler);
}
