import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { SocketService } from './socket.service';
import { HttpDownloadsService } from './http-downloads.service';
import { HttpProgressService } from './http-progress.service';
import { TorrentDownloadsService } from './torrent-downloads.service';

import { HttpDownloadComponent } from './http-download/http-download.component';
import { TorrentDownloadComponent } from './torrent-download/torrent-download.component';
import { HttpDownloadsComponent } from './http-downloads/http-downloads.component';
import { DclWrapperComponent } from './dcl-wrapper/dcl-wrapper.component';

@NgModule({
    declarations: [
        AppComponent,
        HttpDownloadComponent,
        TorrentDownloadComponent,
        HttpDownloadsComponent,
        DclWrapperComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        SocketService,
        HttpDownloadsService,
        HttpProgressService,
        TorrentDownloadsService
    ],
    entryComponents: [
        HttpDownloadComponent,
        TorrentDownloadComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
