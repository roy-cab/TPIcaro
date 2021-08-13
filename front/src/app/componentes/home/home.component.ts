import { Component, OnInit } from '@angular/core';
import { MemorandosService, Memorandos } from '../../servicios/memorandos.service'
import { Router } from '@angular/router';


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

  constructor(private MemorandoService: MemorandosService, private router: Router) {

  }


  ngOnInit(): void {
    this.loading = true
    this.usuario = localStorage.getItem('userInfo')
    this.getIdUsuario()
    this.listarMemorandos();

  }

  listarMemorandos() {
    this.MemorandoService.getMemorandos().subscribe(
      res => {
        console.log(res)
        this.ListaMemorandos = <any>res;
      },
      err => console.log(err)
    );
  }

  getIdUsuario() {
    this.usuario = JSON.parse(this.usuario);
    this.MemorandoService.postIdUsuario(this.usuario).subscribe(
      res => {
        console.log(res)
        this.idUsuario = <any>res;
        this.loading = false
      },
      err => console.log(err)
    );
  }

  prueba() {
    console.log(this.usuario)
  }

}
