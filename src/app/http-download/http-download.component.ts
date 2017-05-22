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
    public progress : HttpProgress = new HttpProgress();
    public progressPercentage : number = undefined;

    constructor(private progressService: HttpProgressService) {
    }

    ngOnInit() {
        this.progressService.changes.subscribe(data => {
            if (this.download && data.url == this.download.url) {
                // update progress
                console.log("update progress");
                this.progress.current = data.current;
                this.progress.length = data.length;
                this.progressPercentage = Math.round(this.progress.current / this.progress.length * 100);
                let status = HttpDownload.stringToStatus(data.status);
                if (status != undefined)
                    this.download.status = status;
            }
        });
    }

    update(dl : HttpDownload) {
        this.download = dl;
        this.progressService.request(dl.url);
    }

    percentageStyle() : any {
        let perc = this.progressPercentage || 0;
        return { width: `${perc}%` };
    }
}
