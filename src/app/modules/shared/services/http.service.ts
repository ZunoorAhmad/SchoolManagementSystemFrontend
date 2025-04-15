import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get(endpoint: string, headers = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.http.get(endpoint, { headers: headers }).subscribe((resposnse: any) => {
          // if (resposnse && resposnse.success) {
          resolve(resposnse);
          // } else {
          //   reject(resposnse);
          // }
        });
      } catch (error) {
        reject(false)
      }
    });
  }

  post(endpoint: string, body: any, headers = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.http.post(endpoint, body, { headers: headers }).subscribe((resposnse: any) => {
          if (resposnse) {
            resolve(resposnse);
          } else {
            reject(resposnse);
          }
        }, (err) => {
          reject(err);
        });
      } catch (error) {
        reject(error)
      }
    });
  }

  put(endpoint: string, body: any, headers = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.http.put(endpoint, body, { headers: headers }).subscribe((resposnse: any) => {
          // if (resposnse && resposnse.success) {
          resolve(resposnse);
          // } else {
          //   reject(resposnse);
          // }
        });
      } catch (error) { }
    });
  }

  patch(endpoint: string, body: any, headers = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.http.patch(endpoint, body, { headers: headers }).subscribe((resposnse: any) => {
          // if (resposnse && resposnse.success) {
          resolve(resposnse);
          // } else {
          //   reject(resposnse);
          // }
        });
      } catch (error) { }
    });
  }

  delete(endpoint: string, headers = {}) {
    return new Promise((resolve, reject) => {
      try {
        this.http.delete(endpoint, { headers: headers, responseType: 'text' }).subscribe(
          (response: any) => {
            console.log(response);
            resolve(response);
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

}
