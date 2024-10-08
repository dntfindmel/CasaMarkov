import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Carrinho } from '../model/carrinho';
import { Item } from '../model/item';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})

export class CarrinhoComponent {
  public carrinho: Produto[] = [];

  constructor() {
    // Carrega os itens do carrinho do LocalStorage
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      this.carrinho = JSON.parse(carrinhoSalvo);
    }
  }

  aumentarQuantidade(produto: Produto) {
    produto.quantidade++;
    this.atualizarLocalStorage();
  }

  diminuirQuantidade(produto: Produto) {
    if (produto.quantidade > 1) {
      produto.quantidade--;
      this.atualizarLocalStorage();
    }
  }

  removerItem(produto: Produto) {
    this.carrinho = this.carrinho.filter(item => item.id !== produto.id);
    this.atualizarLocalStorage();
  }

  // Calcula o total de todos os produtos no carrinho
  getTotal(): number {
    return this.carrinho.reduce((total, produto) => total + produto.valor * produto.quantidade, 0);
  }

  atualizarLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
  }
}

