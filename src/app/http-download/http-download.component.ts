import { Component, OnInit } from '@angular/core';
import { HttpDownload } from '../http-download';
import { HttpProgress } from '../http-progress';
import { HttpProgressService } from "../http-progress.service";

@Component({
  selector: 'app-http-download',
  templateUrl: './http-download.component.html',
  styleUrls: ['./http-download.component.css']
})
export class HttpDownloadComponent implements OnInit {
    public download : HttpDownload = new HttpDownload();

    constructor(private progress: HttpProgressService) {
    }

    ngOnInit() {
        this.progress.changes.subscribe(data => {
            if (this.download && data.url == this.download.url) {
                // update progress
                console.log("update progress");
            }
        });
    }

    update(dl : HttpDownload) {
        this.download = dl;
        this.progress.request(dl.url);
    }
}
