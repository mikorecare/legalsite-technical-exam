export class SpeechModel {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly title: string,
        public readonly dateCreated: string,
        public readonly dateModified: string,
        public speechContent: string
    ) { }
}