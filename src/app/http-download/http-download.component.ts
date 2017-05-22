import { Component, OnInit } from '@angular/core';
import { HttpDownload, HttpDownloadState } from '../http-download';
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
    public downloadState : HttpDownloadState = undefined;

    constructor(private progressService: HttpProgressService) {
    }

    ngOnInit() {
        this.progressService.changes.subscribe(data => {
            if (this.download && data.url == this.download.url) {
                // update progress
                // console.log("update progress");
                let perc = Math.round(data.current / data.length * 100);
                let state = HttpDownload.stringToState(data.state);
                if (this.progressPercentage != perc || this.downloadState != state) {
                    this.progress.current = data.current;
                    this.progress.length = data.length;
                    this.progressPercentage = perc;
                    if (state !== undefined)
                        this.downloadState = state;
                    console.log(`ugh ${this.progressPercentage} from ${this.progress.current} + ${this.progress.length}`);
                }
            }
        });
    }

    update(dl : HttpDownload) {
        this.download = dl;
        this.progressService.request(dl.url);
    }

    percentageStyle() : any {
        // console.log("hey, percentageStyle called");
        let perc = this.progressPercentage || 0;
        return { width: `${perc}%` };
    }
}
