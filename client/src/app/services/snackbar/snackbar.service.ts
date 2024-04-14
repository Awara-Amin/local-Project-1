import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    console.log('inside snackbar.service.ts-March-14-5');
    if (action === 'error') {
      this._snackBar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['black-snackbar'],
      });
    } else {
      console.log('inside snackbar.service.ts-March-14-6');
      this._snackBar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['style-error'],
      });
    }
  }
}
