import { compileNgModule } from '@angular/compiler';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

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

  login(){
    console.log("datos al apretar boton:" + this.usuario+','+this.pass)
    // this._authService.validate(this.usuario, this.pass)
    // .then((response) => {
    //   this.user.usuario = this.usuario;
    //   this.user.clave = this.pass;
    //   this._authService.setUserInfo(JSON.stringify(this.user));
    //   this.router.navigate(['home']);
    // })
    // .catch((error) => console.log('error: '+ error))

  this._authService.validate(this.usuario, this.pass).subscribe(
    res => {
      console.log('algo')
      console.log(res);
      this.user.usuario = this.usuario;
      this.user.clave = this.pass;
      this._authService.setUserInfo(JSON.stringify(this.user));
      this.router.navigate(['home']);
    },
    err => console.log(err)
  )
  }

  prueba(){
    this._authService.simpleGet().subscribe(
      res => {
        console.log('entre al res')
       console.log(res)
      },
      err => console.log("entro al error = "+err.message)
    )
  }


}
