import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carrinho } from '../model/carrinho';
import { Item } from '../model/item';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent {
  public mensagem: String = "";
  public item: Produto = new Produto();
  constructor(){
    let json = localStorage.getItem("produto");
    if(json != null){
      this.item = JSON.parse(json);
    } else {
      this.mensagem = "Produto não encontrado!";
    }
  }

  public adicionarItem(obj:Produto){
    let json = localStorage.getItem("carrinho");
    let jsonCliente = localStorage.getItem("cliente");
    let carrinho: Carrinho = new Carrinho();
    let item: Item = new Item();
    if(json == null){
        item.id = obj.id;
        item.produto = obj;
        item.quantidade = 1;
        item.valor = obj.valor;
        carrinho.id = 1;
        carrinho.total = obj.valor;
        carrinho.itens.push(item);
        if(jsonCliente != null) carrinho.cliente = JSON.parse(jsonCliente);
    } else {
      let achou = false;
      carrinho = JSON.parse(json);
      for(let i=0; i<carrinho.itens.length; i++){
        if(carrinho.itens[i].id == obj.id){
          carrinho.itens[i].quantidade = carrinho.itens[i].quantidade + 1;
          carrinho.itens[i].valor =  carrinho.itens[i].quantidade * carrinho.itens[i].produto.valor;
          achou = true;
          break;
        }
      }
      if(!achou){
        item.id = obj.id;
        item.produto = obj;
        item.quantidade = 1;
        item.valor = obj.valor;
        carrinho.itens.push(item);
      }
    }

    carrinho.total = 0;
    for(let i = 0; i < carrinho.itens.length; i++){
      carrinho.total = carrinho.itens[i].valor + carrinho.total;
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    window.location.href = "./carrinho";
  }
}
