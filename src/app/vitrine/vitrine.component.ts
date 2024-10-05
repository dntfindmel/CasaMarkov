import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { Carrinho } from '../model/carrinho';
import { Item } from '../model/item';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})

export class VitrineComponent {
  public lista: Produto[] = [
    {id: 1, nome: "Deck de Commander - Duskmourn: House of Horror - Miracle Worker", descritivo: "Em Duskmourn: House of Horror, os jogadores mais destemidos conhecerão uma Casa que ocupa um plano inteiro, onde seus maiores medos se tornarão realidade.", valor: 349.90, quantidade: 10, keywords: "MTG"},
    {id: 2, nome: "Deck de Commander - Duskmourn: House of Horror - Jump Scare", descritivo: "Em Duskmourn: House of Horror, os jogadores mais destemidos conhecerão uma Casa que ocupa um plano inteiro, onde seus maiores medos se tornarão realidade.", valor: 248.90, quantidade: 8, keywords: "MTG"},
    {id: 3, nome: "Deck de Commander - Duskmourn: House of Horror - Endless Punishment", descritivo: "Em Duskmourn: House of Horror, os jogadores mais destemidos conhecerão uma Casa que ocupa um plano inteiro, onde seus maiores medos se tornarão realidade.", valor: 349.90, quantidade: 15, keywords: "MTG"},
    {id: 4, nome: "Deck de Commander - Duskmourn: House of Horror - Death Toll", descritivo: "Em Duskmourn: House of Horror, os jogadores mais destemidos conhecerão uma Casa que ocupa um plano inteiro, onde seus maiores medos se tornarão realidade.", valor: 224.90, quantidade: 6, keywords: "MTG"},

    {id: 5, nome: "Baralho Temático HeartGold SoulSilver - Ember Spark", descritivo: "O Ember Spark Theme Deck da expansão HeartGold & SoulSilver do Pokémon Trading Card Game foca predominantemente em Pokémon do tipo Fogo e Relâmpago. Cada Theme Deck é embalado com um deck de 60 cartas, contadores de dano, uma moeda personalizada, um livro de regras, uma lista de cartas e um tapete para um jogador.", valor: 849.90, quantidade: 5, keywords: "POKEMON"},
    {id: 6, nome: "Baralho Temático HeartGold SoulSilver - Growth Clash", descritivo: "O Growth Clash Theme Deck da expansão HeartGold & SoulSilver do Pokémon Trading Card Game foca predominantemente em Pokémon do tipo Grass e Fighting. Cada Theme Deck é embalado com um deck de 60 cards, contadores de dano, uma moeda personalizada, um livro de regras, uma lista de cards e um tapete single-player.", valor: 399.90, quantidade: 8, keywords: "POKEMON"},
    {id: 7, nome: "Baralho Temático Evoluções - Pikachu Power", descritivo: "O Pikachu Power Theme Deck da expansão Evolutions do Pokémon Trading Card Game foca predominantemente em Pokémon do tipo Lightning e Grass. Cada Theme Deck é embalado com um deck de 60 cards, contadores de dano, uma moeda personalizada, uma folha de regras, uma lista de cards, uma caixa de deck, um tapete para dois jogadores e um card de código TCGO.", valor: 399.90, quantidade: 13, keywords: "POKEMON"},
    {id: 8, nome: "Baralho Temático Evoluções - Mewtwo Mayhem", descritivo: "O Mewtwo Mayhem Theme Deck da expansão Evolutions do Pokémon Trading Card Game foca predominantemente em Pokémon do tipo Psychic e Fighting. Cada Theme Deck é embalado com um deck de 60 cards, contadores de dano, uma moeda personalizada, uma folha de regras, uma lista de cards, uma caixa de deck, um tapete para dois jogadores e um card de código TCGO.", valor: 499.90, quantidade: 9, keywords: "POKEMON"},

    {id: 9, nome: "Deck Estrutural - Marik", descritivo: "Em Duskmourn: House of Horror, os jogadores mais destemidos conhecerão uma Casa que ocupa um plano inteiro, onde seus maiores medos se tornarão realidade.", valor: 754.90, quantidade: 3, keywords: "YUGIOH"},
    {id: 10, nome: "Deck Estrutural - Samurai Warlords", descritivo: "Em Duskmourn: House of Horror, os jogadores mais destemidos conhecerão uma Casa que ocupa um plano inteiro, onde seus maiores medos se tornarão realidade.", valor: 599.90, quantidade: 7, keywords: "YUGIOH"},
    {id: 11, nome: "Deck Estrutural - Yugi Muto", descritivo: "Em Duskmourn: House of Horror, os jogadores mais destemidos conhecerão uma Casa que ocupa um plano inteiro, onde seus maiores medos se tornarão realidade.", valor: 399.90, quantidade: 12, keywords: "YUGIOH"},
    {id: 12, nome: "Deck Estrutural - Seto Kaiba", descritivo: "Em Duskmourn: House of Horror, os jogadores mais destemidos conhecerão uma Casa que ocupa um plano inteiro, onde seus maiores medos se tornarão realidade.", valor: 349.90, quantidade:0, keywords: "YUGIOH"}
  ]

  public verDetalhe(item:Produto){
    localStorage.setItem("produto", JSON.stringify(item));
    window.location.href = "./detalhes";
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
