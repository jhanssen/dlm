import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class SocketService {

    private socket: WebSocket;
    private listener: EventEmitter<any> = new EventEmitter();
    private pending: string[] = [];

    public constructor() {
        this.socket = new WebSocket(`ws://${window.location.host}/api/ws`);
        this.socket.onopen = event => {
            // write pending
            for (let idx in this.pending) {
                this.socket.send(this.pending[idx]);
            }
            this.pending = [];
            this.listener.emit({"type": "open", "data": event});
        }
        this.socket.onclose = event => {
            this.listener.emit({"type": "close", "data": event});
        }
        this.socket.onmessage = event => {
            this.listener.emit({"type": "message", "data": JSON.parse(event.data)});
        }
    }

    public send(data: string) {
        switch (this.socket.readyState) {
        case WebSocket.CONNECTING:
            this.pending.push(data);
            break;
        case WebSocket.OPEN:
            this.socket.send(data);
            break;
        }
    }

    public close() {
        this.socket.close();
    }

    public getEventListener() {
        return this.listener;
    }

}
