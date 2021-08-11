import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }

us = {}
ruta = 'api/authenticate'

public isAuthenticated() : Boolean {
  let userData = localStorage.getItem('userInfo')
  if(userData && JSON.parse(userData)){
    return true;
  }
  return false;
}

public setUserInfo(user: string){
  localStorage.setItem('userInfo', JSON.stringify(user));
}

public validate(usuario: string, pass: string) {
  console.log('llego acá:'+usuario+','+pass)
  this.us = {'username' : usuario, 'password' : pass}
  console.log(this.us)
  console.log(this.ruta)



  return this.http.post(this.ruta, this.us,{responseType: 'json'});
}

public simpleGet() {
  return this.http.get('/', {responseType: 'text'});
}

}