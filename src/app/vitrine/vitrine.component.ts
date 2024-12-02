import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { Carrinho } from '../model/carrinho';
import { Item } from '../model/item';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})

export class VitrineComponent {

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }
  //Necessário para carregar os dados do back na variavel, sem esse init ele não carrega nada e a vitrine fica vazia


  public lista: Produto[] = [];

  carregarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (data) => {
        this.lista = data; // Armazena os resultados do listar na variável lista, direto do backend
      },
      error: (err) => {
        console.error('Erro ao carregar os produtos:', err);
      },
    });
  }  

  /*public lista: Produto[] = [
    {id: 1, nome: "Deck de Commander - Duskmourn: House of Horror - Miracle Worker", descritivo: "Em Duskmourn: House of Horror, os jogadores mais destemidos conhecerão uma Casa que ocupa um plano inteiro, onde seus maiores medos se tornarão realidade.", valor: 349.90, quantidade: 10, keywords: "MTG"},
    {id: 2, nome: "Deck de Commander - Duskmourn: House of Horror - Jump Scare", descritivo: "Em Duskmourn: House of Horror, os jogadores mais destemidos conhecerão uma Casa que ocupa um plano inteiro, onde seus maiores medos se tornarão realidade.", valor: 248.90, quantidade: 8, keywords: "MTG"},
    {id: 3, nome: "Deck de Commander - Duskmourn: House of Horror - Endless Punishment", descritivo: "Em Duskmourn: House of Horror, os jogadores mais destemidos conhecerão uma Casa que ocupa um plano inteiro, onde seus maiores medos se tornarão realidade.", valor: 349.90, quantidade: 15, keywords: "MTG"},
    {id: 4, nome: "Deck de Commander - Duskmourn: House of Horror - Death Toll", descritivo: "Em Duskmourn: House of Horror, os jogadores mais destemidos conhecerão uma Casa que ocupa um plano inteiro, onde seus maiores medos se tornarão realidade.", valor: 224.90, quantidade: 6, keywords: "MTG"},

    {id: 5, nome: "Baralho Temático HeartGold SoulSilver - Ember Spark", descritivo: "O Ember Spark Theme Deck da expansão HeartGold & SoulSilver do Pokémon Trading Card Game foca predominantemente em Pokémon do tipo Fogo e Relâmpago. Cada Theme Deck é embalado com um deck de 60 cartas, contadores de dano, uma moeda personalizada, um livro de regras, uma lista de cartas e um tapete para um jogador.", valor: 849.90, quantidade: 5, keywords: "POKEMON"},
    {id: 6, nome: "Baralho Temático HeartGold SoulSilver - Growth Clash", descritivo: "O Growth Clash Theme Deck da expansão HeartGold & SoulSilver do Pokémon Trading Card Game foca predominantemente em Pokémon do tipo Grass e Fighting. Cada Theme Deck é embalado com um deck de 60 cards, contadores de dano, uma moeda personalizada, um livro de regras, uma lista de cards e um tapete single-player.", valor: 399.90, quantidade: 8, keywords: "POKEMON"},
    {id: 7, nome: "Baralho Temático Evoluções - Pikachu Power", descritivo: "O Pikachu Power Theme Deck da expansão Evolutions do Pokémon Trading Card Game foca predominantemente em Pokémon do tipo Lightning e Grass. Cada Theme Deck é embalado com um deck de 60 cards, contadores de dano, uma moeda personalizada, uma folha de regras, uma lista de cards, uma caixa de deck, um tapete para dois jogadores e um card de código TCGO.", valor: 399.90, quantidade: 13, keywords: "POKEMON"},
    {id: 8, nome: "Baralho Temático Evoluções - Mewtwo Mayhem", descritivo: "O Mewtwo Mayhem Theme Deck da expansão Evolutions do Pokémon Trading Card Game foca predominantemente em Pokémon do tipo Psychic e Fighting. Cada Theme Deck é embalado com um deck de 60 cards, contadores de dano, uma moeda personalizada, uma folha de regras, uma lista de cards, uma caixa de deck, um tapete para dois jogadores e um card de código TCGO.", valor: 499.90, quantidade: 9, keywords: "POKEMON"},

    {id: 9, nome: "Deck Estrutural - Marik", descritivo: "O Deck Estrutural Marik contém 42 Estampas Ilustradas.", valor: 754.90, quantidade: 3, keywords: "YUGIOH"},
    {id: 10, nome: "Deck Estrutural - Samurai Warlords", descritivo: "O Samurai Warlords Structure Deck vem com 41 cartas, incluindo um novíssimo Six Samurai Xyz Monster! E está repleto de algumas das cartas Six Samurai mais quentes já lançadas, de 'Great Shogun Shien' e 'Legendary Six Samurai - Kizan' a 'Six Samurai United' e 'Musakani Magatama'.", valor: 599.90, quantidade: 7, keywords: "YUGIOH"},
    {id: 11, nome: "Deck Estrutural - Yugi Muto", descritivo: "O Deck Estrutural Yugi Muto contém 45 Estampas Ilustradas.", valor: 399.90, quantidade: 12, keywords: "YUGIOH"},
    {id: 12, nome: "Deck Estrutural - Seto Kaiba", descritivo: "O Deck Estrutural Seto Kaiba contém 45 Estampas Ilustradas.", valor: 349.90, quantidade:0, keywords: "YUGIOH"}
  ]*/

  public verDetalhe(item:Produto){
    localStorage.setItem("produto", JSON.stringify(item));
    window.location.href = "./detalhes";
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
