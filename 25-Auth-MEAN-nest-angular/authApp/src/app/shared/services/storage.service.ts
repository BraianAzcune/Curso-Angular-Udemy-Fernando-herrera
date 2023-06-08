import { Injectable } from '@angular/core';
import { keyType } from '../interfaces/StorageKeys';
export {keyType};

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  get(key: keyType.angularToken | keyType.pathRequested): string;
  get(key: keyType): any{
    switch(key){
      case keyType.angularToken:
        return localStorage.getItem(key) ?? '';
      case keyType.pathRequested:
        return localStorage.getItem(key) ?? '';
    }
  }

  set(key: keyType, s:string){
    localStorage.setItem(key, s);
  }

  delete(key:keyType){
    localStorage.removeItem(key);
  }
}

//  correct type inference
// const v = (new StorageService()).get(keyType.pathRequested);


