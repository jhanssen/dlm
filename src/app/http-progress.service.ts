import { Injectable } from '@angular/core';
import { SocketService } from "./socket.service";
import { HttpProgress } from './http-progress';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class HttpProgressService {
    subject = new ReplaySubject<HttpProgress>(1);
    typeString = "http-progress";

    public changes = this.subject.asObservable();

    constructor(private socket: SocketService) {
        this.socket.getEventListener().subscribe(event => {
            if (event.type == "message") {
                if ("type" in event.data && event.data.type == this.typeString) {
                    if (event.data.data instanceof Object) {
                        let url : string = event.data.data.url;
                        let current : number = event.data.data.current;
                        let length : number = event.data.data.length;
                        let status : string = event.data.data.status;
                        let progress = new HttpProgress(url, current, length, status);
                        this.subject.next(progress);
                    }
                }
            }
        });
    }

    request(url : string) {
        this.socket.send(JSON.stringify({ type: this.typeString, url: url }));
    }
}
