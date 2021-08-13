import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import {MemorandosService, Memorandos} from '../../servicios/memorandos.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-mensaje',
  templateUrl: './nuevo-mensaje.component.html',
  styleUrls: ['./nuevo-mensaje.component.css']
})
export class NuevoMensajeComponent implements OnInit {

  fecha = new Date()
  hoy = this.fecha.getDate()
  
  memorando = new Memorandos(0,"","","","",this.fecha)

  ListaUsuarios : any[] = [];

  constructor(private MemorandoService: MemorandosService, private router:Router) { }

  ngOnInit(): void {
    this.listarUsuarios();
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


  enviar(){
    this.MemorandoService.addMensaje(this.memorando).subscribe();
    this.router.navigate(['/Home']);
  }
}
