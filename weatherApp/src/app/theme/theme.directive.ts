import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';
import { light, Theme, dark } from './theme';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective {

  private active: Theme = light;
  constructor() { }
  
  @HostListener('click') toggleTheme(){
    if (this.isDarkTheme()) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  isDarkTheme(): boolean {
    return this.active.name === dark.name;
  }

  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }

  setLightTheme(): void {
    this.setActiveTheme(light);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
        document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
    
  }

}
