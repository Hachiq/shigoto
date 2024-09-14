export interface IStorageService {
  reinitialize(): void;

  exists(key: string): Promise<boolean>;

  retrieve(key: string): Promise<any>;

  store(key: string, value: any): Promise<any>;

  remove(key: string): Promise<any>;

  clear(): Promise<any>;
}