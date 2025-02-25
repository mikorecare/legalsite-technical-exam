import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechFilterService {

  private authorSubject = new BehaviorSubject<string>("");
  private keywordsSubject = new BehaviorSubject<string>("");
  private dateSubject = new BehaviorSubject<string>("");

  public author$ = this.authorSubject.asObservable();
  public keywords$ = this.keywordsSubject.asObservable();
  public date$ = this.dateSubject.asObservable();

  constructor(){}

  public setAuthor(author: string): void {
    this.authorSubject.next(author);
  }

  public setKeywords(keywords: string): void {
    this.keywordsSubject.next(keywords);
  }

  public setDate(date: string): void {
    this.dateSubject.next(date);
  }
}
