import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GlobalService } from './global.service';
import { SpeechModel } from '../models/speech.model';

@Injectable({
    providedIn: 'root',
})
export class CachedDataService {

    constructor(private globalService: GlobalService) { }

    private async createUserId(): Promise<string> {
        const users = await firstValueFrom(this.globalService.users$);
        const lastUser = [...users]
            .sort((a, b) => parseInt(a.id.split('-')[1]) - parseInt(b.id.split('-')[1]))
            .pop();

        const lastIdNumber = lastUser ? parseInt(lastUser.id.split('-')[1]) : 0;
        return `user-${String(lastIdNumber + 1).padStart(3, '0')}`;
    }

    private async createSpeechId(): Promise<string> {
        const speeches = await firstValueFrom(this.globalService.speeches$);
        const lastSpeech = [...speeches]
            .sort((a, b) => parseInt(a.id.split('-')[1]) - parseInt(b.id.split('-')[1]))
            .pop();

        const lastIdNumber = lastSpeech ? parseInt(lastSpeech.id.split('-')[1]) : 0;
        return `speech-${String(lastIdNumber + 1).padStart(3, '0')}`;
    }

    public async createSpeech(contentTitle: string, speechContent: string): Promise<void> {
        const newId = await this.createSpeechId();
        const authorId = await firstValueFrom(this.globalService.selectedUser$);

        const newSpeech = new SpeechModel(
            newId,
            authorId,
            contentTitle,
            new Date().toISOString(),
            new Date().toISOString(),
            speechContent
        );

        this.globalService.createSpeech(newSpeech);
    }

    public async updateSpeech(contentTitle: string, speechContent: string): Promise<void> {
        const selectedSpeechId = await firstValueFrom(this.globalService.selectedSpeech$);
        const currentSpeeches = await firstValueFrom(this.globalService.speeches$);

        const updatedSpeeches = currentSpeeches.map(speech =>
            speech.id === selectedSpeechId
                ? {
                    ...speech,
                    title: contentTitle,
                    speechContent: speechContent,
                    dateModified: new Date().toISOString()
                }
                : speech
        );

        this.globalService.updateSpeeches(updatedSpeeches);
    }

    public async deleteSpeech(): Promise<void> {
        const selectedSpeechId = await firstValueFrom(this.globalService.selectedSpeech$);
        const currentSpeeches = await firstValueFrom(this.globalService.speeches$);

        const updatedSpeeches = currentSpeeches.filter(speech => speech.id !== selectedSpeechId);

        this.globalService.updateSpeeches(updatedSpeeches);
    }
}
