import { compileNgModule } from '@angular/compiler';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {


  constructor(private _authService: AuthService, private router: Router) { }

  usuario: string = '';
  pass: string = '';

  user = {
    usuario: '',
    clave: ''
  }


  ngOnInit(): void {
  }

  login() {
    this._authService.validate(this.usuario, this.pass).subscribe(
      res => {
        this.user.usuario = this.usuario;
        this.user.clave = this.pass;
        this.mensajeExito();
        this._authService.setUserInfo(JSON.stringify(this.user));
        this.router.navigate(['home']);
      },
      err => {
        console.log(err);
        this.mensajeError();
      }
    )
  }

  prueba() {
    this._authService.simpleGet().subscribe(
      res => {
        console.log(res)
      },
      err => console.log("entro al error = " + err.message)
    )
  }

  async mensajeError() {
    await Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Datos Incorrectos!',
      showConfirmButton: false,
      timer: 1000,
    })
  }

  async mensajeExito() {
    await Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bienvenido ' + this.user.usuario,
      showConfirmButton: false,
      timer: 1000
    })
  }
}
