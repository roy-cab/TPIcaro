import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }

us = {}

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
  return this.http.post('/api/authenticate', this.us);
}

}