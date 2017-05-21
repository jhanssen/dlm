import { Component, OnInit } from '@angular/core';
import { HttpDownload} from '../http-download';

@Component({
  selector: 'app-http-download',
  templateUrl: './http-download.component.html',
  styleUrls: ['./http-download.component.css']
})
export class HttpDownloadComponent implements OnInit {
    public download : HttpDownload = new HttpDownload();

    constructor() { }

    ngOnInit() {
    }
}
