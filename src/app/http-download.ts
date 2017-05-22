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
}
