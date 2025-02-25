import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ 
    providedIn: "root" 
})
export class SnackbarService {

    private readonly autoDismissInMs: number = 2000;

    constructor(
        private readonly matSnackbar: MatSnackBar,
    ) { }

    public error(message: string): void {
        this.matSnackbar.open(message, "Dismiss", {
            horizontalPosition: "right",
            verticalPosition: "bottom",
            duration: this.autoDismissInMs,
            panelClass: ["error-snackbar"]
        });
    }

    public success(message: string): void {
        this.matSnackbar.open(message, "Ok", {
            horizontalPosition: "right",
            verticalPosition: "bottom",
            duration: this.autoDismissInMs,
            panelClass: ["success-snackbar"]
        });
    }

    public warning(message: string): void {
        this.matSnackbar.open(message, "Dismiss", {
            horizontalPosition: "right",
            verticalPosition: "bottom",
            duration: this.autoDismissInMs,
            panelClass: ["warning-snackbar"]
        });
    }

    public info(message: string): void {
        this.matSnackbar.open(message, "Ok", {
            horizontalPosition: "right",
            verticalPosition: "bottom",
            duration: this.autoDismissInMs,
            panelClass: ["info-snackbar"]
        });
    }
}