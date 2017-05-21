import { Component, OnInit } from '@angular/core';
import { HttpDownloadsService } from '../http-downloads.service';
import { HttpDownload} from '../http-download';

@Component({
  selector: 'app-http-downloads',
  templateUrl: './http-downloads.component.html',
  styleUrls: ['./http-downloads.component.css']
})
export class HttpDownloadsComponent implements OnInit {

    constructor(private downloads: HttpDownloadsService) { }

    ngOnInit() {
        this.downloads.changes.subscribe(data => {
            console.log("http!", data);
        }, err => {
        });
    }

}
