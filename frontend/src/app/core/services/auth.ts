import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../interfaces/LoginResponse';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);
  router = inject(Router);

  token = signal<string | null>(localStorage.getItem('token'));

  user = signal<User | null>((() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  })()
  );

  isLoggedIn = computed<boolean>(() => !!this.token());

  isAdmin = computed<boolean>(() => this.user()?.role.name === 'admin');

  logout() {
  return this.http.post(environment.apiUrl + '/logout', {}).pipe(
    tap(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.token.set(null);
      this.user.set(null);
      this.router.navigate(['/']);
    })
  );
}

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(environment.apiUrl + '/login', { email, password }).pipe(
      tap ((response) => {
        const { user, token } = response;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        this.token.set(token);
        this.user.set(user);

      })
    );

  }

  register(first_name: string, last_name: string, email: string, password: string) {
   return this.http.post<LoginResponse>(environment.apiUrl + '/register', { first_name, last_name, email, password }).pipe(
      tap((response) => {
        const { user, token } = response;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        this.token.set(token);
        this.user.set(user);

      })
    );
  }
}
