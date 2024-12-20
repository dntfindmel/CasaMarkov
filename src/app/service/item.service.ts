import { Injectable } from '@angular/core';
import { Item } from '../model/item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http : HttpClient) { }

  gravarItens(obj: Item[], idPd: number): Observable<number>{
    return this.http.post<number>("http://localhost:8080/api/item/"+ idPd, obj, { responseType: 'number' as 'json' });
  }
}
