import { Injectable } from '@angular/core';
import md5 from 'md5';

@Injectable({
  providedIn: 'root'
})
export class UtilStoreService {
  private runtimeStore: any;

  constructor() {
    this.runtimeStore = {};
  }

  store(type: 'localStorage' | 'sessionStorage', key: string, value?: any) {
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

  local(key: string, value?: any) {
    return this.store('localStorage', key, value);
  }

  session(key: string, value?: any) {
    return this.store('sessionStorage', key, value);
  }

  runtime(key: string, value?: any) {
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
      if (this.runtimeStore.hasOwnProperty(key)) {
        console.log('url already cashed')
      }
      this.runtimeStore[key] = value;
    }

    // No value supplied, return value
    if (typeof value === "undefined") {
      // Get value
      if (this.runtimeStore.hasOwnProperty(key)) {
        data = this.runtimeStore[key]
      }
      return data;
    }

    // Null specified, remove store
    if (value === null) {
      if (this.runtimeStore.hasOwnProperty(key)) {
        delete this.runtimeStore[key]
      }
    }
  }

  remove(type: 'localStorage' | 'sessionStorage' | 'runtimeStorage', key: string) {
    if (type != 'runtimeStorage') {
      this.store(type, key, null);
    } else {
      this.runtime(key, null);
    }
  }

  clearAll() {
    this.runtimeStore = {};
    if (typeof (Storage) !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
    }
  }

  getRuntime() {
    return this.runtimeStore;
  }
  clearRuntime() {
    this.runtimeStore = {};
  }

  getSession() {
    return sessionStorage;
  }
  clearSession() {
    if (typeof (Storage) !== "undefined") {
      sessionStorage.clear();
    }
  }

  getLocal() {
    return localStorage;
  }
  clearLocal() {
    if (typeof (Storage) !== "undefined") {
      localStorage.clear();
    }
  }

  getAll(): any {
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
  createCookie(key, value, exp = 30) {
    var date = new Date();
    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toUTCString();
    if (value == null && exp < 0) {
      value = this.readCookie(key);
    }
    document.cookie = key + "=" + value + expires + "; path=/";
  }


  removeCookie(key) {
    this.createCookie(key, null, -1);
  }

  /**
   * Returns contents of cookie
   * @param  key       The key or identifier for the store
   */
  readCookie(key) {
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
