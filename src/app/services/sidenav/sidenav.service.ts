import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  // BehaviorSubject mantiene el último valor emitido y lo proporciona a nuevos suscriptores
  private sidenavToggleSource = new BehaviorSubject<boolean>(false);

  // Observable que otros componentes pueden suscribirse
  sidenavToggle$ = this.sidenavToggleSource.asObservable();

  // Estado actual del sidenav
  private isOpen = false;

  constructor() { }

  // Método para alternar el estado
  toggle() {
    this.isOpen = !this.isOpen;
    this.sidenavToggleSource.next(this.isOpen);
  }

  // Métodos adicionales para control específico
  open() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.sidenavToggleSource.next(true);
    }
  }

  close() {
    if (this.isOpen) {
      this.isOpen = false;
      this.sidenavToggleSource.next(false);
    }
  }
}
