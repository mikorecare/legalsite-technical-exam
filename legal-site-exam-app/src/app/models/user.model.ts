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

    public get speechCollectionIds(): string[] {
        return this._speechCollectionIds;
    }

    private _id: string = "";
    private _firstName: string = "";
    private _lastName: string = "";
    private _speechCollectionIds: string[] = [];

    constructor(user?: UserModel) {
        if(user) {
            this._id = user.id;
            this._firstName = user.firstName;
            this._lastName = user.lastName;
            this._speechCollectionIds = user.speechCollectionIds
        }
    }

    public setSpeech(speech: SpeechModel) {
        this._speechCollectionIds.filter((speechFilter: string)=>{
            
        });
    }
}