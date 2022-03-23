import {lastValueFrom, Observable} from 'rxjs';
import {ModalService} from '../services/modal.service';
import {IFileStack} from '../interfaces/filestack';
import {IAvatar} from '../interfaces/avatar';
import {ObjectToUrlParamString} from './object-utils';
import {environment} from "../services/environment.service";

export const GetThumbnailFromVideo = (videoSrc) => {
  const observer = new Observable<any>((observer) => {
    const video: any = document.createElement('video');
    const canvas = document.createElement('canvas');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = videoSrc;
    video.load();
    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      setTimeout(() => {
        video.currentTime = video.duration / 2;
      }, 200);
    }, false);
    // extract video thumbnail once seeking is complete
    video.addEventListener('seeked', () => {
      // define a canvas to have the same dimension as the video
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      canvas.toBlob((blob) => {
        if (blob) {
          observer.next({
            width: video.videoWidth,
            height: video.videoHeight,
            thumbnail: URL.createObjectURL(blob)
          });
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });
    video.addEventListener('error', () => {
      observer.next(null);
      observer.complete();
    }, false);
  });
  return lastValueFrom(observer);
};

export const FileStackToPreviewUrl = (fileStack: IFileStack | IAvatar, size: string = '200x200', ext: string = 'jpg', placeholder: string = null) => {
  if (fileStack && typeof fileStack !== 'undefined') {
    const params = [];
    if (fileStack.hasOwnProperty('purchased') && fileStack.purchased) {
      params['p'] = 1;
    }
    if (fileStack.hasOwnProperty('own') && fileStack.own) {
      params['o'] = 1;
    }
    if (fileStack.hasOwnProperty('token') && fileStack.token.hasOwnProperty(size)) {
      params['token'] = fileStack.token[size];
    }
    if (fileStack.hasOwnProperty('collectionId')) {
      return FileStackServer(fileStack) + '/preview/' + fileStack.collectionId + '/' + fileStack.code + '/' + fileStack._id + '/' + size + '.' + ext + ObjectToUrlParamString(params);
    } else {
      return FileStackServer(fileStack) + '/preview/' + fileStack.code + '/' + fileStack._id + '/' + size + '.' + ext + ObjectToUrlParamString(params);
    }
  } else {
    return placeholder;
  }
};

export const FileStackOwn = (fileStack: IFileStack) => {
  return (fileStack?.price > 0 && fileStack?.own);
};

export const FileStackNotOwn = (fileStack: IFileStack) => {
  return (!fileStack?.own);
};

export const FileStackNotPurchased = (fileStack: IFileStack) => {
  return (fileStack?.price > 0 && !fileStack?.purchased);
};

export const FileStackToUrl = (fileStack: IFileStack | IAvatar, ext: string = 'jpg') => {
  if (fileStack && typeof fileStack !== 'undefined') {
    return FileStackServer(fileStack) + '/file/' + fileStack.code + '/' + fileStack._id + '.' + ext;
  }
};

export const FileStackToVideoUrl = (fileStack: IFileStack, ext: string = 'mp4') => {
  if (fileStack && typeof fileStack !== 'undefined') {
    if (fileStack.hasOwnProperty('collectionId')) {
      return FileStackServer(fileStack) + '/video/' + fileStack.collectionId + '/' + fileStack.code + '/' + fileStack._id + '.' + ext;
    } else {
      return FileStackServer(fileStack) + '/video/' + fileStack.code + '/' + fileStack._id + '.' + ext;
    }
  }
};

export const BlobToImageDimension = (file): Observable<any> => {
  const _url = (URL || webkitURL);
  let src = null;
  if (file) {
    const blob = new Blob([file], {type: file.type});
    src = _url.createObjectURL(blob);
  }
  return new Observable<any>((observer) => {
    // Create an image and load the object URL
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = function () {
        _url.revokeObjectURL(src);
        observer.next({width: img.width, height: img.height});
        observer.complete();
      }
    } else {
      observer.next({width: 0, height: 0});
      observer.complete();
    }
  })
}

export const BlobToBase64 = (blob): Observable<string> => {
  return new Observable((observer) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = (event: any) => {
      observer.next(event.target.result);
      observer.complete();
    }
  });
};

export const FileStackBlobToArrayBuffer = (blob): Observable<ArrayBuffer> => {
  return new Observable((observer) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      observer.next(event.target.result);
      observer.complete();
    };
    reader.readAsArrayBuffer(blob);
  });
};

export const FileStackBlobToFile = (theBlob: Blob, name: string): File => {
  const blob: any = theBlob;
  if (blob) {
    blob.lastModifiedDate = new Date();
    blob.name = name;
  }
  return <File>blob;
};

export const FileStackServer = (fileStack: IFileStack) => {
  return (fileStack.price > 0) ? environment.FILE_SERVER_PURCHASED : environment.FILE_SERVER;
};

export const FileStackCropper = async (file: Blob, orientation: number = null): Promise<any> => {
  return ModalService.openModal('image-cropper', {
    file,
    orientation
  });
};

export const Base64UrlToBlob = async (url) => {
  return new Promise<Blob>((resolve) => {
    fetch(url)
      .then(res => res.blob())
      .then(blob => resolve(blob))
  });
}

export const FileStackGenerateFileFromExternalUrl = async (url) => {
  const myHeaders = new Headers();
  const response = await fetch(new Request(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: myHeaders,
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }));
  const mimeType = response.headers.get("Content-Type");
  if (response.status === 200 && mimeType.match('video.*') || mimeType.match('image.*')) {
    const filename = url.substring(url.lastIndexOf('/') + 1);
    const data = await response.blob();
    const metadata = {
      type: mimeType
    };
    return new File([data], filename, metadata);
  } else {
    throw new Error("not reachable");
  }
};


