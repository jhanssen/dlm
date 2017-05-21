export class HttpDownload {
    constructor(public url : string,
                public username : string,
                public password : string,
                public headers : Map<string, string>) {
    }
}
