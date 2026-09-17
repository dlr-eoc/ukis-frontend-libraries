import { Service } from '@angular/core';
import md5 from 'md5';

@Service()
export class UtilStoreService {
  private runtimeStore: any;

  constructor() {
    this.runtimeStore = {};
  }

  private _store(type: 'localStorage' | 'sessionStorage', key: string, value?: string | null | boolean | object) {
    let lsSupport = false;
    let data: null | string;
    let storrage: Storage;

    /* if (!value) {
      console.log(type, key);
    } else {
      console.log(type, key, value);
    } */
    // sor key as md5
    key = md5(key);

    // Check for native support
    if (typeof (Storage) !== 'undefined') {
      lsSupport = true;
    }

    if (lsSupport) {
      if (type === 'localStorage') {
        storrage = localStorage;
      } else if (type === 'sessionStorage') {
        storrage = sessionStorage;
      }
    }

    // If value is detected, set new or modify store
    if (typeof value !== 'undefined' && value !== null) {
      // Convert object values to JSON
      if (typeof value === 'object' || typeof value === 'boolean') {
        value = JSON.stringify(value);
      }
      
      // Set the store
      if (typeof value === 'string') {
        if (lsSupport) { // Native support
          localStorage.setItem(key, value);
        } else { // Use Cookie
          this.createCookie(key, value, 30);
        }
      }
      return value;
    }

    // No value supplied, return value
    if (typeof value === 'undefined') {
      // Get value
      if (lsSupport) { // Native support
        data = localStorage.getItem(key);
      } else { // Use cookie
        data = this.readCookie(key);
      }

      // Try to parse JSON...
      try {
        if (data) {
          data = JSON.parse(data);
        }
      } catch (e) {
        data = data;
      }
      // console.log(key, data);
      return data as never as Record<string, any>;
    }

    // Null specified, remove store
    if (value === null) {
      if (lsSupport) { // Native support
        localStorage.removeItem(key);
      } else { // Use cookie
        this.createCookie(key, '', -1);
      }
      return null;
    } else {
      return null;
    }
  }

  public local(key: string, value?: string | null | boolean | object) {
    return this._store('localStorage', key, value);
  }

  public session(key: string, value?: string | null | boolean | object) {
    return this._store('sessionStorage', key, value);
  }

  public runtime(key: string, value?: any) {
    let data;
    /* if (!value) {
      console.log(key);
    } else {
      console.log(key, value);
    } */
    // sor key as md5
    key = md5(key);

    // If value is detected, set new or modify store
    if (typeof value !== 'undefined' && value !== null) {
      // Set the store
      if (this.runtimeStore.hasOwnProperty(key)) {
        console.log(`key ${key} already in the store`);
      }
      this.runtimeStore[key] = value;
    }

    // No value supplied, return value
    if (typeof value === 'undefined') {
      // Get value
      if (this.runtimeStore.hasOwnProperty(key)) {
        data = this.runtimeStore[key];
      }
      return data;
    }

    // Null specified, remove store
    if (value === null) {
      if (this.runtimeStore.hasOwnProperty(key)) {
        delete this.runtimeStore[key];
      }
    }
  }

  public remove(type: 'localStorage' | 'sessionStorage' | 'runtimeStorage', key: string) {
    if (type !== 'runtimeStorage') {
      this._store(type, key, null);
    } else {
      this.runtime(key, null);
    }
  }

  public clearAll() {
    this.runtimeStore = {};
    if (typeof (Storage) !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
  }

  public getRuntime() {
    return this.runtimeStore;
  }
  public clearRuntime() {
    this.runtimeStore = {};
  }

  public getSession() {
    return sessionStorage;
  }
  public clearSession() {
    if (typeof (Storage) !== 'undefined') {
      sessionStorage.clear();
    }
  }

  public getLocal() {
    return localStorage;
  }
  public clearLocal() {
    if (typeof (Storage) !== 'undefined') {
      localStorage.clear();
    }
  }

  public getAll(): any {
    return {
      runtime: this.getRuntime(),
      session: this.getSession(),
      local: this.getLocal()
    };
  }



  /**
   * Creates new cookie or removes cookie with negative expiration
   * @param  key       The key or identifier for the store
   * @param  value     Contents of the store
   * @param  exp       Expiration - creation defaults to 30 days
   */
  public createCookie(key: string, value: string | null, exp = 30) {
    const date = new Date();
    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
    const expires = '; expires=' + date.toUTCString();
    if (value == null && exp < 0) {
      value = this.readCookie(key);
    }
    document.cookie = key + '=' + value + expires + '; path=/';
  }


  public removeCookie(key: string) {
    this.createCookie(key, null, -1);
  }

  /**
   * Returns contents of cookie
   * @param  key       The key or identifier for the store
   */
  public readCookie(key: string) {
    const nameEQ = key + '=';
    const ca = document.cookie.split(';');
    for (let i = 0, max = ca.length; i < max; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') { c = c.substring(1, c.length); }
      if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length); }
    }
    return null;
  }
}
