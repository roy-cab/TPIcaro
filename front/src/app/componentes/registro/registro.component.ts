import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor() { }

  nuevo_usuario: any;
  nueva_pass: any;
  confirma_pass: any;
  pais: any;
  ciudad: any;
  
  ngOnInit(): void {
  }

}
