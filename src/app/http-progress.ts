export class HttpProgress {
    constructor(public url : string = undefined,
                public current : number = undefined,
                public length : number = undefined,
                public status : string = undefined) {
    }
}
