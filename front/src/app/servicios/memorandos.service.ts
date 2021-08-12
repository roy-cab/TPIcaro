import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemorandosService {
  url= '/api/memorandos';
  constructor(private http: HttpClient) { }

  //get memorandos
  getMemorandos(){
    return this.http.get(this.url);
  }
  
}

export class Memorandos{
  private _id:number;
  private _detalle:String;
  private _remitente:String;
  private _destinatario:String;
  private _mensaje:String;
  private _fechaenvio:Date;

  constructor (idmemorando:number,detalle:String,remitente:String,destinatario:String,mensaje:String,fechaenvio:Date){
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
    
    
}







