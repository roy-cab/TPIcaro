import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MemorandosService } from 'src/app/servicios/memorandos.service';
import { UbicacionesService } from 'src/app/servicios/ubicaciones.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private _memorandoService: MemorandosService,
              private _ubicacionesService: UbicacionesService,
              private router: Router) { }

  nuevo_usuario: any;
  nueva_pass: any;
  confirma_pass: any;
  pais: any;
  ciudad: any;

  listadoUsuarios: any;
  listadoCiudades: any;
  listadoPaises: any;
  usuario: any;


  ngOnInit(): void {
    this.traerUsuarios();
    this.traerCiudades();
    this.traerPaises();
  }

  crearUsuario() {

    console.log(
      "usuario : " + this.nuevo_usuario +
      "\npais : " + this.pais +
      "\nciudad : " + this.ciudad +
      "\npass : " + this.nueva_pass +
      "\nconfirma passs : " + this.confirma_pass
    )
    console.log(this.listadoCiudades);
    console.log(this.listadoPaises);
    if(this.esMismaPass() && this.UsuarioNoExiste()) {
      console.log("Datos de nuevo usuario ok");
      this.actUsuario();
      this.insertarUsuario(this.usuario);
      this.router.navigate(['']);

    }
    else{
      console.log("Datos de nuevo usuario erroneos")
    }

  }

  esMismaPass() {
    return (this.nueva_pass === this.confirma_pass);
  }

  UsuarioNoExiste() {
    for(let i=0;i < this.listadoUsuarios.length;i++){
      if (this.listadoUsuarios[i].NombreUsuario === this.nuevo_usuario) {
        return false;
      }
    }
    return true;

  }

  traerUsuarios() {
    this._memorandoService.getUsuarios().subscribe(
      res => {
        this.listadoUsuarios = res;
      },
      error => {
        console.log(error)
      }
    )
  }

  traerCiudades() {
    this._ubicacionesService.getCiudades().subscribe(
      res => {
        this.listadoCiudades = res;
      },
      error => {
        console.log(error)
      }
    )
  }

  traerPaises() {
    this._ubicacionesService.getPaises().subscribe(
      res => {
        this.listadoPaises = res;
      },
      error => {
        console.log(error)
      }
    )
  }

  insertarUsuario(usuario: any) {
    this._memorandoService.postUsuario(usuario).subscribe(
      res => {
        console.log("Usuario creado correctamente.");
        this.mensajeExito();
      },
      error => {
        this.mensajeError();
      }
    )
  }

  actUsuario() {
    this.usuario = {
      "usuario" : this.nuevo_usuario, 
      "pass" : this.nueva_pass, 
      "ciudad" : this.ciudad, 
      "pais" : this.pais
    }
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
      title: 'Se creó el usuario correctamente!',
      showConfirmButton: false,
      timer: 1000
    })
  }
}
