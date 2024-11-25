import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Carrinho } from '../model/carrinho';
import { Item } from '../model/item';
import { Produto } from '../model/produto';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { PedidoService } from '../service/pedido.service';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})

export class CarrinhoComponent {
  public cesta: Produto[] = [];
  public carrinho : Carrinho = new Carrinho;
  public cliente : Cliente = new Cliente;
  public itens: Item[] = [];

  constructor(private clienteService: ClienteService, private pedidoService: PedidoService, private itemService: ItemService) {
    // Carrega os itens do carrinho do LocalStorage
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      this.cesta = JSON.parse(carrinhoSalvo);
    }
  }

  aumentarQuantidade(produto: Produto) {
    produto.quantidade++;
    this.atualizarLocalStorage();
    this.sincronizarItens(); // Atualiza os itens
  }

  diminuirQuantidade(produto: Produto) {
    if (produto.quantidade > 1) {
      produto.quantidade--;
      this.atualizarLocalStorage();
      this.sincronizarItens(); 
    }
  }

  removerItem(produto: Produto) {
    this.cesta = this.cesta.filter(item => item.id !== produto.id);
    this.atualizarLocalStorage();
    this.sincronizarItens(); 
  }

  // Calcula o total de todos os produtos no carrinho
  getTotal(): number {
    return this.cesta.reduce((total, produto) => total + produto.valor * produto.quantidade, 0);
  }

  atualizarLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(this.cesta));
  }

  finalizarCompra(){
    let json = localStorage.getItem('cliente');
    if (!json){
      window.location.href="./cadastro"; //Se não tem cliente logado, ou seja, no localStorage, ele manda pra tela de Login para logar
    } else {
      this.cliente = JSON.parse(json);
      this.carrinho.cliente = this.cliente; //Atrela o Cliente no Cliente do carrinho, para depois enviar pro pedido
      this.carrinho.total = this.getTotal(); // Ja agiliza o total pegando o total da tela
      this.pedidoService.gravar(this.carrinho).subscribe({
        next: (data) => {
          this.carrinho.id = data; //como o id é gerado depois do insert no banco, ele precisa pegar o id para atrelar nos itens
          // Adicionar produtos ao array de itens do carrinho
          this.sincronizarItens();
          //adicionar o id do pedido para cada item
          this.itens.forEach(item => {
            item.pedidoId = this.carrinho.id;
          }); //Essa parte do Id ta funcionando corretamente, o erro está como o JPA esta batendo no banco
          this.itemService.gravarItens(this.itens).subscribe({
            next: (data) => {
                //Aqui depois ele manda um pop up falando compra efetuada com sucesso e puxa o endereço do cliente nesse pop up
                //E depois pode limpar o carrinho e deixar ele vazio
            },
            error: (err) => {
              console.log("Erro ao tentar gravar os itens do pedido "+err)
            }
          })
        },
        error: (err) => {
          console.log("Erro ao tentar gravar o pedido "+err)
        }
      })
    }
  }

  public sincronizarItens(): void {
    this.itens = this.cesta.map(produto => {
      const item = new Item();
      item.id = produto.id;
      item.produto = produto;
      item.quantidade = produto.quantidade; // Usa a quantidade atual do produto
      item.valor = produto.valor * produto.quantidade; // Calcula o subtotal
      return item;
    });
  }

 
}

