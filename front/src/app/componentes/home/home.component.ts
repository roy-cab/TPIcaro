import { Component, OnInit } from '@angular/core';
import {MemorandosService, Memorandos} from '../../servicios/memorandos.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //variable
  ListaMemorandos: any[] = [];
  

  constructor(private MemorandoService: MemorandosService, private router:Router) { 

  }

  ngOnInit(): void {
    this.listarMemorandos();
    
  }
  
  listarMemorandos()
  {
    this.MemorandoService.getMemorandos().subscribe(
      res=>{
        console.log(res)
        this.ListaMemorandos=<any>res;
      },
      err => console.log(err)
    );
  }

}
