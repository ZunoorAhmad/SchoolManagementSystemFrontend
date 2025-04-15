import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: WebSocket;
  public tradesSubject = new Subject<any>();

  constructor() {
    this.connect();
  }

  connect() {
    this.socket = new WebSocket('ws://127.0.0.1:8000/ws/trades/');
    this.socket.onopen = () => {
    };
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.tradesSubject.next(message);  // Pass the message to subscribers
    };
    this.socket.onerror = (error) => {
    };
    this.socket.onclose = (event) => {
    };
  }

  getTrades() {
    return this.tradesSubject.asObservable();  // To subscribe to trade updates
  }
}