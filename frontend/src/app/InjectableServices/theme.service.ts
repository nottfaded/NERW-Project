import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme: boolean = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  getTheme(): string {
    return this.isDarkTheme ? 'dark-theme' : 'light-theme';
  }
}