export enum HttpDownloadState {
    Paused = 1,
    Downloading,
    Finished,
    Error
}

export class HttpDownload {
    public _component : string;

    constructor(public url : string = undefined,
                public state : HttpDownloadState = undefined,
                public username : string = undefined,
                public password : string = undefined,
                public headers : Map<string, string> = undefined) {
    }

    serialize() : any {
        return {
            url: this.url,
            username: this.username,
            password: this.password,
            headers: this.headers
        };
    }

    static stringToState(state : string) : HttpDownloadState {
        switch (state) {
        case "paused":
            return HttpDownloadState.Paused;
        case "downloading":
            return HttpDownloadState.Downloading;
        case "finished":
            return HttpDownloadState.Finished;
        case "error":
            return HttpDownloadState.Error;
        }
        return undefined;
    }

    static stateToString(state : HttpDownloadState) : string {
        switch (state) {
        case HttpDownloadState.Paused:
            return "paused";
        case HttpDownloadState.Downloading:
            return "downloading";
        case HttpDownloadState.Finished:
            return "finished";
        case HttpDownloadState.Error:
            return "error";
        }
        return undefined;
    }
}
