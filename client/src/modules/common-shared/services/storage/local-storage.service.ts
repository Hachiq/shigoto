import { Injectable } from '@angular/core';
import { IStorageService } from './IStorageService';

interface Storage {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements IStorageService {

  private storage: Storage = {};

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
    return Promise.resolve();
  }

  remove(key: string): Promise<any> {
    delete this.storage[key];
    return Promise.resolve();
  }

  clear(): Promise<any> {
    this.storage = {};
    return Promise.resolve();
  }
}
