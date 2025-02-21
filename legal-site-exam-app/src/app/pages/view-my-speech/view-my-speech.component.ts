import { Component } from "@angular/core";
import { SpeechListComponent } from "../../components/speech-list/speech-list.component";
import { FormTextAreaComponent } from "../../components/form-text-area/form-text-area.component";

@Component({
    selector:"view-my-speech-component",
    templateUrl:"./view-my-speech.component.html",
    imports: [
        SpeechListComponent,
        FormTextAreaComponent
    ],
    standalone: true
})
export class ViewMySpeechComponent {}