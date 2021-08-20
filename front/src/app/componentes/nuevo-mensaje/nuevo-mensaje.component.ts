import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit} from '@angular/core';
import {MemorandosService, Memorandos} from '../../servicios/memorandos.service'
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-nuevo-mensaje',
  templateUrl: './nuevo-mensaje.component.html',
  styleUrls: ['./nuevo-mensaje.component.css'],
  providers:[HomeComponent]
})
export class NuevoMensajeComponent implements OnInit {

  fecha = new Date()
  hoy = this.fecha.getDate()
  memorando = new Memorandos(0,0,"","","",this.fecha)

  
  ListaUsuarios : any[] = [];
  UltimoMemorando: any[] = [];
  ListaDestinatarios : Memorandos[];
  constructor(private MemorandoService: MemorandosService, private router:Router,private comp: HomeComponent) { }

  ngOnInit(): void {
    this.listarUsuarios();
    this.comp.ListaMemorandos;
    this.UlimoDetalle();
    this.MemorandoService.postIdUsuario(this.memorando.idmemorando);
  }


  listarUsuarios()
  {
    this.MemorandoService.getUsuarios().subscribe(
      res=>{
        console.log(res)
        this.ListaUsuarios=<any>res;
      },
      err => console.log(err)
    );
  }

  UlimoDetalle()
  {
    this.MemorandoService.getUltimoDetalle().subscribe(
      res=>{
        console.log(res)
        console.log(this.memorando.detalle)
        this.UltimoMemorando=<any>res;
      },
      err => console.log(err)
    );
  }


  enviar(){
    const IdUltimoDetalle = this.memorando.detalle + 1;
    const mensaje = new Memorandos(this.memorando.idmemorando,IdUltimoDetalle,this.memorando.remitente,this.memorando.destinatario,this.memorando.mensaje,this.fecha);
    // this.UltimoMemorando = this.comp.ListaMemorandos[1] + 1;
    // delete this.memorando.idmemorando;
    console.log(mensaje);
    this.MemorandoService.addMensaje(mensaje).subscribe();
    // this.router.navigate(['/home']);
  }
}
