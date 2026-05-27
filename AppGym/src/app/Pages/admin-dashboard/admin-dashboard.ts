import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../Services/UserService';
import { UserInterface } from '../../../interfaces/UserInterface';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboardComponent implements OnInit {
  usuarios: UserInterface[] = [];
  customFonts = CustomFonts;
  getFont = getFont;

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Obtener todos los usuarios registrados excluyendo una posible cuenta admin en el mock
    this.usuarios = this.userService.obtenerUsuariosSinAdmin();
  }

  cerrarSesion(): void {
    this.location.replaceState('/login');
    this.router.navigate(['/login']);
  }
}
