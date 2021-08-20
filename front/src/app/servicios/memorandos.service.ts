import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemorandosService {
  url= '/api/memorandos';
  urlUsers= '/api/usuarios';
  UrlUltimoDetalle='/api/memorandos/ultimodetalle';
  urlNuevoUsuario =  '/api/usuarios/nuevoUsuario';
  urlGetIdUsuario =  '/api/usuarios/getId';

  constructor(private http: HttpClient) { }

  //get memorandos
  getMemorandos() {
    return this.http.get(this.url);
  }

   //get memorandos
   getUltimoDetalle(){
    return this.http.get(this.UrlUltimoDetalle);
  }

  // get usuarios
  getUsuarios() {
    return this.http.get(this.urlUsers);
  }

  //post usuario
  postUsuario(unUsuario: any) {
    return this.http.post(this.urlNuevoUsuario, unUsuario);
  }

  //post usuario
  postIdUsuario(unUsuario: any) {
    // console.log(unUsuario)
    return this.http.post(this.urlGetIdUsuario, JSON.parse(unUsuario));
  }

  addMensaje(memorando: Memorandos) {
    return this.http.post(this.url, memorando);
  }

}

export class Memorandos{
  private _id:number;
  private _detalle:number;
  private _remitente:String;
  private _destinatario:String;
  private _mensaje:String;
  private _fechaenvio:Date;

  constructor (idmemorando:number,detalle:number,remitente:String,destinatario:String,mensaje:String,fechaenvio:Date){
    this._id = idmemorando;
    this._detalle = detalle;
    this._remitente = remitente;
    this._destinatario = destinatario;
    this._mensaje = mensaje;
    this._fechaenvio = fechaenvio;
    }

    public get idmemorando(): number {
        return this._id;
    }
    public set idmemorando(value: number) {
        this._id = value;
    }

    public get detalle(): number {
        return this._detalle;
    }
    public set detalle(value: number) {
        this._detalle = value;
    }
    public get remitente(): String {
      return this._remitente;
    }
    public set remitente(value: String) {
      this._remitente = value;
    }

    public get destinatario(): String {
        return this._destinatario;
    }
    public set destinatario(value: String) {
        this._destinatario = value;
    }

    public get mensaje(): String {
      return this._mensaje;
    }
  public set mensaje(value: String) {
    this._mensaje = value;
  }

  public get fechaenvio(): Date {
    return this._fechaenvio;
  }
  public set fechaenvio(value: Date) {
    this._fechaenvio = value;
  }


}








