export class HttpDownload {
    public _component : string;

    constructor(public url : string = undefined,
                public username : string = undefined,
                public password : string = undefined,
                public headers : Map<string, string> = undefined) {
    }
}
