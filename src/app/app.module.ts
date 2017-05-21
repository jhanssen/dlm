import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { SocketService } from './socket.service';
import { HttpDownloadsService } from './http-downloads.service';
import { TorrentDownloadsService } from './torrent-downloads.service';

import { HttpDownloadComponent } from './http-download/http-download.component';
import { TorrentDownloadComponent } from './torrent-download/torrent-download.component';

@NgModule({
    declarations: [
        AppComponent,
        HttpDownloadComponent,
        TorrentDownloadComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        SocketService,
        HttpDownloadsService,
        TorrentDownloadsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
