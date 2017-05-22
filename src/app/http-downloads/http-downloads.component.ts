import { Component, OnInit } from '@angular/core';
import { HttpDownloadsService } from '../http-downloads.service';
import { HttpDownload} from '../http-download';
// import { DclWrapperComponent } from '../dcl-wrapper/dcl-wrapper.component';

@Component({
    selector: 'app-http-downloads',
    // directives: [DclWrapperComponent],
    templateUrl: './http-downloads.component.html',
    styleUrls: ['./http-downloads.component.css']
})
export class HttpDownloadsComponent implements OnInit {
    downloads : HttpDownload[] = new Array<HttpDownload>();

    constructor(private downloadsService: HttpDownloadsService) { }

    ngOnInit() {
        this.downloadsService.changes.subscribe(data => {
            console.log("http!", data);
            if (data instanceof Array) {
                for (let idx = 0; idx < data.length; ++idx) {
                    data[idx]._component = "HttpDownloadComponent";
                }
            }
            this.downloads = data;
        }, err => {
        });
    }

    add() {
        console.log("add");
    }
}
