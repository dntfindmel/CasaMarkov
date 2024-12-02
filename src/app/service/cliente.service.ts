import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http : HttpClient) { }

  gravar(obj: Cliente) : Observable<string> {
    return this.http.post<string>("http://localhost:8080/api/cliente", obj, { responseType: 'text' as 'json' }) //response type pq a saida precisa acessar como json para mostra certo, frescura do ts
  }

  pesquisarId(id: number) : Observable<Cliente> {
    return this.http.get<Cliente>("http://localhost:8080/api/cliente/id/"+ id)
  }

  pesquisarEmail(email: string) : Observable<Cliente> {
    return this.http.get<Cliente>("http://localhost:8080/api/cliente/email/"+ email)
  }

  login(obj: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>("http://localhost:8080/api/cliente/login", obj)
  }

  delete(email: string) : Observable<string> {
    return this.http.delete<string>("http://localhost:8080/api/cliente/email/"+ email, { responseType: 'text' as 'json' })
  }

  alter(obj: Cliente) : Observable<string>{
    return this.http.put<string>("http://localhost:8080/api/cliente", obj, { responseType: 'text' as 'json' })
  }
}
