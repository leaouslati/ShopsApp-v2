import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Auth } from '../../../core/services/auth';
import { LoginDialog } from '../login-dialog/login-dialog';

@Component({
  selector: 'app-register-dialog',
  imports: [MatDialogModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './register-dialog.html',
  styleUrl: './register-dialog.css',
})
export class RegisterDialog {
  dialogRef = inject(MatDialogRef<RegisterDialog>);
  auth = inject(Auth);
  dialog = inject(MatDialog);
  translate = inject(TranslateService);

  registerError = signal<string>('');
  isLoading = signal<boolean>(false);

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, {
    validators: (group: AbstractControl): ValidationErrors | null => {
      const pass = group.get('password')?.value;
      const confirm = group.get('confirmPassword')?.value;
      return pass === confirm ? null : { passwordMismatch: true };
    }
  });

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading.set(true);
    const { firstName, lastName, email, password } = this.registerForm.value;

    this.auth.register(firstName!, lastName!, email!, password!).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        this.isLoading.set(false);
        this.registerError.set(this.translate.instant('REGISTER.EMAIL_ALREADY_REGISTERED'));
      },
    });
  }

  openLogin() {
    this.dialogRef.close();
    this.dialog.open(LoginDialog);
  }
}
