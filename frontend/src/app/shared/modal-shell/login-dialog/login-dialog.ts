import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Auth } from '../../../core/services/auth';
import { RegisterDialog } from '../register-dialog/register-dialog';

@Component({
  selector: 'app-login-dialog',
  imports: [MatDialogModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login-dialog.html',
  styleUrl: './login-dialog.css',
})
export class LoginDialog {
  dialogRef = inject(MatDialogRef<LoginDialog>);
  dialog = inject(MatDialog);
  auth = inject(Auth);
  translate = inject(TranslateService);

  loginError = signal<string>('');
  isLoading = signal<boolean>(false);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    const { email, password } = this.loginForm.value;

    this.auth.login(email!, password!).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        this.isLoading.set(false);
        this.loginError.set(this.translate.instant('LOGIN.INVALID_CREDENTIALS'));
      }
    });
  }

  openRegister() {
    this.dialogRef.close();
    this.dialog.open(RegisterDialog, {
      width: '480px',
      backdropClass: 'blurred-backdrop',
    });
  }
}
