import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-logout-dialog',
  imports: [MatDialogContent, TranslatePipe],
  templateUrl: './logout-dialog.html',
  styleUrl: './logout-dialog.css',
})
export class LogoutDialog {
  auth = inject(Auth);
  dialogRef = inject(MatDialogRef<LogoutDialog>);
  isLoading = signal<boolean>(false);

  onLogout() {
    this.isLoading.set(true);
    this.auth.logout().subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        this.dialogRef.close();
      }
    });
  }
}
