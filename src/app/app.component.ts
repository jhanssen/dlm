import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from "./socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
    title = 'app works!';

    public constructor(private socket: SocketService) {
    }

    public ngOnInit() {
        this.socket.getEventListener().subscribe(event => {
            if (event.type == "message") {
                // let data = event.data;
                // console.log("got data", data);
            }
        });
    }

    public ngOnDestroy() {
        this.socket.close();
    }
}
