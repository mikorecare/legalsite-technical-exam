export class SpeechModel {
    constructor(
        public id: string,
        public authorId: string,
        public title: string,
        public dateCreated: string,
        public dateModified: string,
        public speechContent: string
    ) { }
}