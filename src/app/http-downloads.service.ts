import { Injectable } from '@angular/core';
import { SocketService } from "./socket.service";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HttpDownloadsService {
    subject = new BehaviorSubject<any>(false);
    typeString = "http-downloads";

    public changes = this.subject.asObservable();

    constructor(private socket: SocketService) {
        this.socket.send(JSON.stringify({ type: this.typeString }));
        this.socket.getEventListener().subscribe(event => {
            if (event.type == "message") {
                if ("type" in event.data && event.data.type == this.typeString)
                    this.subject.next(event.data);
            }
        });
    }
}
