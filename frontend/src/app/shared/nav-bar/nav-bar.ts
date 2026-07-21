import { Component, inject, input, signal } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../modal-shell/login-dialog/login-dialog';
import { LogoutDialog } from '../modal-shell/logout-dialog/logout-dialog';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {

  auth = inject(Auth);
  translate = inject(TranslateService);
  dialog = inject(MatDialog);
  router = inject(Router);
  
  title = input<string>();
  fontSize = signal<number>(16);
  menuOpen = signal<boolean>(false);

  increaseFont() {
    this.fontSize.update(size => size + 1);
    document.documentElement.style.fontSize = this.fontSize() + 'px';
  }

  decreaseFont() {
    this.fontSize.update(size => size - 1);
    document.documentElement.style.fontSize = this.fontSize() + 'px';
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  }

  toggleMenu() {
    this.menuOpen.update(open => !open);
  }

  openLoginDialog() {
    this.dialog.open(LoginDialog, {
      backdropClass: 'blurred-backdrop',
    });
  }

  openLogoutDialog() {
    this.dialog.open(LogoutDialog, {
      backdropClass: 'blurred-backdrop',
    });
  }


  goToEcommerce() {
if (this.auth.isLoggedIn()) {
    this.router.navigate(['/ecommerce']);
  } else {
    this.dialog.open(LoginDialog, { backdropClass: 'blurred-backdrop' });
  }  }



}
