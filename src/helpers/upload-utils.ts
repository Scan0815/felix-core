import {Credentials} from '../interfaces/credentials';
import {ITransfer, Transfer} from '../interfaces/transfer';
import {UniqueID} from './string-utils';
import {AccountService} from "../services/account.service";

const ActiveUploadConnections: any = {};
const BYTES_PER_CHUNK = 1024 * 1024 * 4;

//const WAIT_TIME_TO_UPLOAD_AGAIN = 2000;
let Loaded = 0;
let Total = 0;

export const CreateFileUpload = async (transfer: ITransfer) => {
  let fileUpload: HTMLFlxFileUploadElement | null = document.querySelector('flx-file-upload');
  if (!fileUpload) {
    fileUpload = document.createElement('flx-file-upload');
    const root = document.querySelector('app-root');
    if (root && fileUpload) {
      root.appendChild(fileUpload);
      const resolvedEl = await fileUpload.componentOnReady();
      if (resolvedEl) {
        Object.assign(resolvedEl, {
          'accept': '*',
          'multiple': true,
          'hidden': true
        });
        resolvedEl.addEventListener('selected', event => UploadOneFile((event as CustomEvent), transfer))
        await resolvedEl?.select();
      }
    }
  } else {
    fileUpload.removeEventListener('selected', event => UploadOneFile((event as CustomEvent), transfer));
    fileUpload.addEventListener('selected', event => UploadOneFile((event as CustomEvent), transfer))
    await fileUpload.select();
  }
}

  async function UploadOneFile(event: CustomEvent, transfer: ITransfer) {
    const files: FileList = event.detail;
    const transfers = [];
    for (let i = 0; i < files.length; i++) {
      transfers.push(new Transfer().deserialize(Object.assign({file:files[i]},transfer)))
    }
    console.log('UploadOneFile',transfers);
    await AccountService.addToStorage('file-stack', transfers);
  }

export async function UploadChunk(url: string, credentials: Credentials, formData: FormData, chunkId: string, progressHandler: any) {
  return new Promise((resolve, reject) => {
    const xhr = ActiveUploadConnections[chunkId] = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader('Accept', 'application/json');
    if (credentials.resource && credentials.token) {
      xhr.setRequestHeader('x-auth-resource', credentials.resource);
      xhr.setRequestHeader('x-auth-token', credentials.token);
    }
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

    xhr.send(formData);
  });
}

export async function InitChunkUpload(url: string,
                                      credentials: Credentials,
                                      transfers: ITransfer[],
                                      responseHandler: (response: any) => void | undefined,
                                      progressHandler?: (loaded: any, total: any) => void | undefined,
                                      errorHandler?: (error: any) => void | undefined,) {
  Loaded = 0;
  Total = 0;
  let chunkCountOverAll = 0;
  const chunkQueue: any = [];
  const transfersArray = transfers;
  transfersArray.forEach((transfer, transferKey) => {
    const blob: any = transfer.file;
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

export async function ProcessNextChunk(url: string,
                                       credentials: Credentials,
                                       chunkQueue: any,
                                       transfers: ITransfer[],
                                       responseHandler?: (response: any) => void | undefined,
                                       progressHandler?: (loaded: any, total: any) => void | undefined,
                                       errorHandler?: (error: any) => void | undefined,
                                       maxActiveConnections = 2) {
  const activeConnections = Object.keys(ActiveUploadConnections).length;

  if (activeConnections >= maxActiveConnections) {
    return;
  }

  if (!chunkQueue.length) {
    return;
  }

  const chunkQueueItem = chunkQueue.pop();
  const transferFile = transfers[chunkQueueItem.transferKey];

  if (transferFile) {
    const isFile = transferFile.hasOwnProperty('name');
    const chunk = transferFile.file && transferFile.file.slice(chunkQueueItem.start, chunkQueueItem.end);
    const formData: FormData = new FormData();
    if (chunk) {
      formData.append('chunk', chunk, (isFile) ? transferFile?.file?.name : UniqueID());
    }
    formData.append('chunkSizeStart', chunkQueueItem.start.toString());
    formData.append('chunkSizeEnd', chunkQueueItem.end.toString());
    formData.append('chunkCount', chunkQueueItem.chunkCount.toString());
    formData.append('fileSize', chunkQueueItem.size.toString());
    if (transferFile?.file?.type) {
      formData.append('fileType', transferFile.file.type.toString());
    }
    if (transferFile?.guid) {
      formData.append('guid', transferFile.guid);
    }
    if (transferFile?.transferId) {
      formData.append('transferId', transferFile.transferId);
    }
    if (transferFile?.exIf) {
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

  }
  await ProcessNextChunk(url, credentials, chunkQueue, transfers, responseHandler, progressHandler, errorHandler);
}
