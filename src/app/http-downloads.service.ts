import { Injectable } from '@angular/core';
import { SocketService } from "./socket.service";
import { HttpDownload, HttpDownloadStatus } from './http-download';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class HttpDownloadsService {
    subject = new ReplaySubject<HttpDownload[]>(1);
    typeString = "http-downloads";

    public changes = this.subject.asObservable();

    constructor(private socket: SocketService) {
        this.socket.send(JSON.stringify({ type: this.typeString }));
        this.socket.getEventListener().subscribe(event => {
            if (event.type == "message") {
                if ("type" in event.data && event.data.type == this.typeString) {
                    let dls = new Array<HttpDownload>();
                    //console.log("eh", event.data);
                    if (event.data.data instanceof Array) {
                        for (let idx = 0; idx < event.data.data.length; ++idx) {
                            let evt : any = event.data.data[idx];
                            let headers : Map<string, string>;
                            let status : HttpDownloadStatus;
                            switch (evt.status) {
                            case "paused":
                                status = HttpDownloadStatus.Paused;
                                break;
                            case "downloading":
                                status = HttpDownloadStatus.Downloading;
                                break;
                            case "finished":
                                status = HttpDownloadStatus.Finished;
                                break;
                            case "error":
                                status = HttpDownloadStatus.Error;
                                break;
                            }
                            if ("headers" in evt) {
                                headers = new Map<string, string>();
                                for (let k in evt.headers) {
                                    headers[k] = evt.headers[k];
                                }
                            }
                            let dl = new HttpDownload(evt.url, status, evt.username, evt.password, headers);
                            dls.push(dl);
                        }
                    }
                    this.subject.next(dls);
                }
            }
        });
    }
}
