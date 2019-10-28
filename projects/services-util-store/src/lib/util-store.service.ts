import { Injectable } from '@angular/core';
import md5 from 'md5';

@Injectable({
  providedIn: 'root'
})
export class UtilStoreService {
  private _runtimeStore: any;

  constructor() {
    this._runtimeStore = {};
  }

  private _store(type: 'localStorage' | 'sessionStorage', key: string, value?: any) {
    var lsSupport = false, data, storrage;

    if (!value) {
      console.log(type, key)
    } else {
      console.log(type, key, value)
    }
    //sor key as md5
    key = md5(key);

    // Check for native support
    if (typeof (Storage) !== "undefined") {
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
    if (typeof value !== "undefined" && value !== null) {
      // Convert object values to JSON
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      // Set the store
      if (lsSupport) { // Native support
        localStorage.setItem(key, value);
      } else { // Use Cookie
        this.createCookie(key, value, 30);
      }
    }

    // No value supplied, return value
    if (typeof value === "undefined") {
      // Get value
      if (lsSupport) { // Native support
        data = localStorage.getItem(key);
      } else { // Use cookie
        data = this.readCookie(key);
      }

      // Try to parse JSON...
      try {
        data = JSON.parse(data);
      }
      catch (e) {
        data = data;
      }
      console.log(key, data)
      return data;

    }

    // Null specified, remove store
    if (value === null) {
      if (lsSupport) { // Native support
        localStorage.removeItem(key);
      } else { // Use cookie
        this.createCookie(key, '', -1);
      }
    }
  }

  public local(key: string, value?: any) {
    return this._store('localStorage', key, value);
  }

  public session(key: string, value?: any) {
    return this._store('sessionStorage', key, value);
  }

  public runtime(key: string, value?: any) {
    var data;
    if (!value) {
      console.log(key)
    } else {
      console.log(key, value)
    }
    //sor key as md5
    key = md5(key);

    // If value is detected, set new or modify store
    if (typeof value !== "undefined" && value !== null) {
      // Set the store
      if (this._runtimeStore.hasOwnProperty(key)) {
        console.log('url already cashed')
      }
      this._runtimeStore[key] = value;
    }

    // No value supplied, return value
    if (typeof value === "undefined") {
      // Get value
      if (this._runtimeStore.hasOwnProperty(key)) {
        data = this._runtimeStore[key]
      }
      return data;
    }

    // Null specified, remove store
    if (value === null) {
      if (this._runtimeStore.hasOwnProperty(key)) {
        delete this._runtimeStore[key]
      }
    }
  }

  public remove(type: 'localStorage' | 'sessionStorage' | 'runtimeStorage', key: string) {
    if (type != 'runtimeStorage') {
      this._store(type, key, null);
    } else {
      this.runtime(key, null);
    }
  }

  public clearAll() {
    this._runtimeStore = {};
    if (typeof (Storage) !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }
  }

  public getRuntime() {
    return this._runtimeStore;
  }
  public clearRuntime() {
    this._runtimeStore = {};
  }

  public getSession() {
    return sessionStorage;
  }
  public clearSession() {
    if (typeof (Storage) !== "undefined") {
      sessionStorage.clear();
    }
  }

  public getLocal() {
    return localStorage;
  }
  public clearLocal() {
    if (typeof (Storage) !== "undefined") {
      localStorage.clear();
    }
  }

  public getAll(): any {
    return {
      'runtime': this.getRuntime(),
      'session': this.getSession(),
      'local': this.getLocal()
    }
  }



  /**
   * Creates new cookie or removes cookie with negative expiration
   * @param  key       The key or identifier for the store
   * @param  value     Contents of the store
   * @param  exp       Expiration - creation defaults to 30 days
   */
  public createCookie(key, value, exp = 30) {
    var date = new Date();
    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toUTCString();
    if (value == null && exp < 0) {
      value = this.readCookie(key);
    }
    document.cookie = key + "=" + value + expires + "; path=/";
  }


  public removeCookie(key) {
    this.createCookie(key, null, -1);
  }

  /**
   * Returns contents of cookie
   * @param  key       The key or identifier for the store
   */
  public readCookie(key) {
    var nameEQ = key + "=";
    var ca = document.cookie.split(';');
    for (var i = 0, max = ca.length; i < max; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}
