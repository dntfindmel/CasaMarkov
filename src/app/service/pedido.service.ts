import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrinho } from '../model/carrinho';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http : HttpClient) { }

  gravar(obj: Carrinho) : Observable<number>{
    return this.http.post<number>("http://localhost:8080/api/pedido", obj, { responseType: 'number' as 'json' });
  }
}
