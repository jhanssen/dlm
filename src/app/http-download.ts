export enum HttpDownloadStatus {
    Paused = 1,
    Downloading,
    Finished,
    Error
}

export class HttpDownload {
    public _component : string;

    constructor(public url : string = undefined,
                public status : HttpDownloadStatus = undefined,
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

    static stringToStatus(status : string) : HttpDownloadStatus {
        switch (status) {
        case "paused":
            return HttpDownloadStatus.Paused;
        case "downloading":
            return HttpDownloadStatus.Downloading;
        case "finished":
            return HttpDownloadStatus.Finished;
        case "error":
            return HttpDownloadStatus.Error;
        }
        return undefined;
    }

    static statusToString(status : HttpDownloadStatus) : string {
        switch (status) {
        case HttpDownloadStatus.Paused:
            return "paused";
        case HttpDownloadStatus.Downloading:
            return "downloading";
        case HttpDownloadStatus.Finished:
            return "finished";
        case HttpDownloadStatus.Error:
            return "error";
        }
        return undefined;
    }
}
