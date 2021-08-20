import { Component, OnInit } from '@angular/core';
import { MemorandosService, Memorandos } from '../../servicios/memorandos.service'
import { Router } from '@angular/router';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { compileNgModule } from '@angular/compiler';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //variable
  ListaMemorandos: any[] = [];
  usuario: any;
  idUsuario: any;
  loading: boolean = false

  constructor(private MemorandoService: MemorandosService, 
              private router: Router) {

  }


  ngOnInit(): void {
    this.loading = true;
    this.usuario = localStorage.getItem('userInfo');
    this.getIdUsuario();
    // this.listarMemorandos();

  }

  listarMemorandos() {
    this.MemorandoService.postMemorandos(this.idUsuario).subscribe(
      res => {
        this.construirObjMemorando(res);
        this.procesaMemorandos()
      },
      err => console.log(err)
    );
  }

  getIdUsuario() {
    this.usuario = JSON.parse(this.usuario);
    this.MemorandoService.postIdUsuario(this.usuario).subscribe(
      res => {
        // console.log(res)
        this.idUsuario = <any>res;
        this.listarMemorandos();
        this.loading = false
      },
      err => console.log(err)
    );
  }

  construirObjMemorando(listarecibida: any) {
    let lista: Memorandos[] = [];
    for(let i = 0; i < listarecibida.length; i++){
      let obj = new Memorandos(i+1,listarecibida[i].IdMemorando, listarecibida[i].Remitente, listarecibida[i].Destinatario, listarecibida[i].Mensaje, new Date(listarecibida[i].FechaEnvio), listarecibida[i].Tipo)
      lista.push(obj)
    }
    this.ListaMemorandos = lista;    
  }

  procesaMemorandos() : any{
    let idDetalle: any = this.ListaMemorandos[0]._detalle;
    let lista_dest: any[] = [];
    // console.log(this.ListaMemorandos)


    for (let i = 0 ; i < (this.ListaMemorandos.length - 1) ; i++) {
      // console.log("primer ingreso al primer for")
      lista_dest.push(this.ListaMemorandos[i]._destinatario);
      for (let j = i+1; j < this.ListaMemorandos.length; j++){

        // console.log("i = "+i+" \nj = " + j + "\ncomparando "+this.ListaMemorandos[i]._detalle+" con "+this.ListaMemorandos[j]._detalle)

        if(this.ListaMemorandos[i]._detalle == this.ListaMemorandos[j]._detalle) {
          // console.log("tienen el mismo id")
          lista_dest.push(this.ListaMemorandos[j]._destinatario);
          this.ListaMemorandos.splice(j,1);
          j--;
          // console.log("destinatarios");
          // console.log(lista_dest)
          // console.log("Nueva lista Memorandos")
          // console.log(this.ListaMemorandos)
          // console.log("Valor de j = "+ j)
          // console.log('\n')
        }
      }
      // console.log(lista_dest)
      if (lista_dest.length > 1){
        let destinatarios = '';
        for (let i = 0; i < lista_dest.length; i++){
          if (lista_dest[i+1]){
            destinatarios += lista_dest[i] + ", ";
          }
          else {
            destinatarios += lista_dest[i]
          }
        }
        // console.log(destinatarios)
        this.ListaMemorandos[i]._destinatario = destinatarios;
        lista_dest = []
        destinatarios = ''
      }
      lista_dest = [];
    }
  }


}
