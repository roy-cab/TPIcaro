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
      this.user.usuario = this.usuario;
      this.user.clave = this.pass;
      this._authService.setUserInfo(JSON.stringify(this.user));
      this.router.navigate(['home']);
    },
    err => console.log(err)
  )
  }



}
