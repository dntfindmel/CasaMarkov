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

adicionarItem(item: Produto) {
  // Verifica se estamos no ambiente do navegador antes de usar localStorage
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    // Recupera o carrinho do LocalStorage ou inicializa um array vazio
    let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

    // Verifica se o item já existe no carrinho
    const itemExistente = carrinho.find((produto: Produto) => produto.id === item.id);

    if (itemExistente) {
      // Se o item já existir, incrementa a quantidade
      itemExistente.quantidade++;
    } else {
      // Se o item não existir, adiciona o novo item com quantidade 1
      carrinho.push({ ...item, quantidade: 1 });
    }

    // Salva o carrinho atualizado no LocalStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Redireciona para a página do carrinho usando href
    window.location.href = "./carrinho";
  } else {
    console.error('localStorage não está disponível no ambiente atual.');
  }
}

}
