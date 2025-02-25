import { Pipe, PipeTransform } from '@angular/core';
import { SpeechModel } from '../models/speech.model';

@Pipe({
  name: 'speechFilter'
})
export class SpeechFilterPipe implements PipeTransform {
  transform(speeches: SpeechModel[], author?: string, keywords?: string, date?: string): SpeechModel[] {
    if (!speeches) return [];

    return speeches.filter(speech => {
      return (
        (!author || speech.authorId.toLowerCase().includes(author.toLowerCase())) &&
        (!keywords || speech.title.toLowerCase().includes(keywords.toLowerCase()) || 
         speech.speechContent.toLowerCase().includes(keywords.toLowerCase())) &&
        (!date || speech.dateCreated.includes(date))
      );
    });
  }
}
