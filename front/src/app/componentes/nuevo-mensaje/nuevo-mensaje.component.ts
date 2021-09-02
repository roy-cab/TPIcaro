import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { MemorandosService, Memorandos, Destinatarios } from '../../servicios/memorandos.service'
import { Router } from '@angular/router';
// import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-nuevo-mensaje',
  templateUrl: './nuevo-mensaje.component.html',
  styleUrls: ['./nuevo-mensaje.component.css']
})
export class NuevoMensajeComponent implements OnInit {

  fecha = new Date()
  hoy = this.fecha.getDate()

  memorando = new Memorandos(0, "", "", "", "", this.fecha, "")

  UltimoMemorando: any;

  ListaDestinatarios = this.MemorandoService.ListaDestinatarios;
  ListaUsuarios: any[] = [];
  IdRemitente: any;
  loading: boolean = false;
  destinatario: any = {};
  // NombreDestinatario:any;
  lista_dest: any[] = [];
  dest_seleccionado:any;
  listaAuxDest:any;

  constructor(private MemorandoService: MemorandosService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.listarUsuarios();
    this.UlimoDetalle();
    this.IdRemitente = localStorage.getItem('userInfo');
    this.getRemitente();
  }

  listarUsuarios() {
    this.MemorandoService.getUsuarios().subscribe(
      res => {
        console.log(res)
        this.ListaUsuarios = <any>res;
      },
      err => console.log(err)
    );
  }

  UlimoDetalle() {
    this.MemorandoService.getUltimoDetalle().subscribe(
      res => {
        console.log(res)
        this.UltimoMemorando = <any>res;
        console.log(this.UltimoMemorando);
      },
      err => console.log(err)
    );
  }

  getRemitente() {
    this.IdRemitente = JSON.parse(this.IdRemitente);
    this.MemorandoService.postIdUsuario(this.IdRemitente).subscribe(
      res => {
        // console.log(res)
        this.IdRemitente = <any>res;
        this.loading = false
        console.log(this.IdRemitente);
      },
      err => console.log(err)
    );
  }

  prueba() {
    console.log(this.destinatario)
    const IdUltimoDetalle = this.UltimoMemorando + 1;
    const mensaje = new Memorandos(this.memorando.idmemorando, IdUltimoDetalle, this.IdRemitente, this.destinatario, this.memorando.mensaje, this.fecha, "");
    console.log(mensaje);
  };

  enviar() {
    const IdUltimoDetalle = this.UltimoMemorando + 1;
    const mensaje = new Memorandos(this.memorando.idmemorando, IdUltimoDetalle, this.IdRemitente, this.destinatario, this.memorando.mensaje, this.fecha, "");
    // this.UltimoMemorando = this.comp.ListaMemorandos[1] + 1;
    // delete this.memorando.idmemorando;
    console.log(mensaje);
    this.MemorandoService.addMensaje(mensaje).subscribe();
    this.router.navigate(['/home']);
  }

  enviar_valores() {
    // location.href='buscar.php?valor=' + valor;
    let nombre = this.ListaUsuarios.find(elemento => elemento.IdUsuario == this.destinatario).NombreUsuario;
    this.dest_seleccionado = {
      'IdUsuario': this.destinatario,
      'NombreUsuario': nombre
    }
    console.log("destinatario actual = " + JSON.stringify(this.dest_seleccionado))
  }

  agregarDestinatario() {
    // console.log("printeando this.destinatario : " + JSON.stringify(this.dest_seleccionado));
    let destElegido = new Destinatarios(this.dest_seleccionado.IdUsuario, this.dest_seleccionado.NombreUsuario);
    // console.log("destinatario elegido: " + JSON.stringify(destElegido))
    this.MemorandoService.crearListaDest(destElegido);
    this.listaAuxDest = this.MemorandoService.subListaDestinatarios;
  }


}
