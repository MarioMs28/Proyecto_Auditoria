import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DaltonismoService {
  private daltonismoActivo: boolean = false;

  toggleDaltonismo(): void {
    this.daltonismoActivo = !this.daltonismoActivo;
    if (this.daltonismoActivo) {
      document.body.classList.add('daltonismo');
    } else {
      document.body.classList.remove('daltonismo');
    }
  }

  isDaltonismoActivo(): boolean {
    return this.daltonismoActivo;
  }
}
