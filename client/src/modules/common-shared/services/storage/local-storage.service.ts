import { Injectable } from '@angular/core';
import { IStorageService } from './IStorageService';
import { BehaviorSubject } from 'rxjs';

interface Storage {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements IStorageService {

  private storage: Storage = {};

  private authState = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.authState.asObservable();

  reinitialize(): void {
    this.storage = {};
  }

  exists(key: string): Promise<boolean> {
    return Promise.resolve(this.storage.hasOwnProperty(key));
  }

  retrieve(key: string): Promise<any> {
    return Promise.resolve(this.storage[key] || null);
  }

  store(key: string, value: any): Promise<any> {
    this.storage[key] = value;
    if (key === 'Authorization' && value) {
      this.authState.next(true);
    }
    return Promise.resolve();
  }

  remove(key: string): Promise<any> {
    delete this.storage[key];
    if (key === 'Authorization') {
      this.authState.next(false);
    }
    return Promise.resolve();
  }

  clear(): Promise<any> {
    this.storage = {};
    return Promise.resolve();
  }
}
