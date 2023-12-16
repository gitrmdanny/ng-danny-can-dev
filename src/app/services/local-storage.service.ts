import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  get(key: string): string | undefined {
    const value = localStorage.getItem(key);

    if (value === null) {
      return undefined;
    }

    return value;
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
