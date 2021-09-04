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
  UrlUltimoDetalle = '/api/memorandos/ultimodetalle';
  ListaDestinatarios : Destinatarios[] = [];
  subListaDestinatarios:any;

  constructor(private http: HttpClient) { }

  //get memorandos
  getMemorandos() {
    return this.http.get(this.url);
  }

  //get memorandos prueba
  postMemorandos(id: any) {
<<<<<<< HEAD
    return this.http.post(this.urlMemos, { "IdUsuario": id });
=======
<<<<<<< HEAD
    return this.http.post(this.urlMemos, { "IdUsuario": id });
=======
    return this.http.post(this.urlMemos, { "IdUsuario" : id});
>>>>>>> beffe2b13fbbb98eba5917e6b5420e416f22c02d
>>>>>>> master
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
  getUltimoDetalle() {
    return this.http.get(this.UrlUltimoDetalle);
  }

  crearListaDest(destinatario: Destinatarios){
    this.ListaDestinatarios.push(destinatario);
    console.log(JSON.stringify(this.ListaDestinatarios));
    console.log(this.ListaDestinatarios.length);
    this.subListaDestinatarios = this.ListaDestinatarios.map(dest => dest.NombreDestinatario)
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

export class Destinatarios {
  private _Iddestinatario: number;
  private _NombreDestinatario: string;

  constructor(Iddestinatario:number,NombreDestinatario:string){
    this._Iddestinatario = Iddestinatario;
    this._NombreDestinatario = NombreDestinatario;

  }

  public get NombreDestinatario(): string {
    return this._NombreDestinatario;
  }
  public set NombreDestinatario(value: string) {
    this._NombreDestinatario = value;
  }


  public get destinatario(): number {
    return this._Iddestinatario;
  }
  public set destinatario(value: number) {
    this._Iddestinatario = value;
  }

}






