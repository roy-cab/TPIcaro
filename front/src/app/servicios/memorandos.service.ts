import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemorandosService {
  url = '/api/memorandos';
  urlMemos = "/api/memorandos/getMemorandos"
  urlUsers = '/api/usuarios';
  urlNuevoUsuario = '/api/usuarios/nuevoUsuario';
  urlGetIdUsuario = '/api/usuarios/getId';
  UrlUltimoDetalle='/api/memorandos/ultimodetalle';

  constructor(private http: HttpClient) { }

  //get memorandos
  getMemorandos() {
    return this.http.get(this.url);
  }

  //get memorandos prueba
  postMemorandos(id: any) {
    return this.http.post(this.urlMemos, { "IdUsuario" : id});
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

  //get ultimoDetalle
  getUltimoDetalle(){
    return this.http.get(this.UrlUltimoDetalle);
}
}

export class Memorandos {
  private _id: number;
  private _detalle: String;
  private _remitente: String;
  private _destinatario: String;
  private _mensaje: String;
  private _fechaenvio: Date;
  private _tipo: String;
  

  constructor(idmemorando: number, detalle: String, remitente: String, destinatario: String, mensaje: String, fechaenvio: Date, tipo: String) {
    this._id = idmemorando;
    this._detalle = detalle;
    this._remitente = remitente;
    this._destinatario = destinatario;
    this._mensaje = mensaje;
    this._fechaenvio = fechaenvio;
    this._tipo = tipo;
  }

  public get idmemorando(): number {
    return this._id;
  }
  public set idmemorando(value: number) {
    this._id = value;
  }

  public get detalle(): String {
    return this._detalle;
  }
  public set detalle(value: String) {
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
  public get tipo(): String {
    return this._tipo;
  }
  public set tipo(value: String) {
    this._tipo = value;
  }

}








