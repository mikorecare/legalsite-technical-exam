import { SpeechModel } from "./speech.model";

export class UserModel {
    public get id(): string {
        return this._id;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public get lastName(): string {
        return this._lastName
    }

    public get speechCollection(): SpeechModel[] {
        return this._speechCollection;
    }

    private _id: string = "";
    private _firstName: string = "";
    private _lastName: string = "";
    private _speechCollection: SpeechModel[] = [];

    constructor(user?: UserModel) {
        if(user) {
            this._id = user.id;
            this._firstName = user.firstName;
            this._lastName = user.lastName;
            this._speechCollection = user.speechCollection
        }
    }

    public setSpeech(speech: SpeechModel) {
        this._speechCollection.filter((speechFilter: SpeechModel)=>{
            
        });
    }
}