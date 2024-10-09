import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../model/produto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})

export class BuscaComponent {
  public mensagem: string = "";
  public filtro: string = "";
  public produtosFiltrados: Produto[] = [];

  public lista: Produto[] = [
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
  ]

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Captura o termo de busca da URL
    this.route.queryParams.subscribe(params => {
      this.filtro = params['q'] || '';
      this.filtrarProdutos(this.filtro);
    });
  }

  filtrarProdutos(termo: string) {
    termo = termo.toLowerCase();
    this.produtosFiltrados = this.lista.filter(produto =>
      produto.nome.toLowerCase().includes(termo) ||
      produto.descritivo.toLowerCase().includes(termo) ||
      produto.keywords.toLowerCase().includes(termo)
    );

    if (this.produtosFiltrados.length === 0) {
      this.mensagem = "Nenhum produto encontrado.";
    } else {
      this.mensagem = "";
    }
  }

  public verDetalhe(item:Produto){
    localStorage.setItem("produto", JSON.stringify(item));
    window.location.href = "./detalhes";
  }

  adicionarItem(item: Produto) {

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
      const itemExistente = carrinho.find((produto: Produto) => produto.id === item.id);

      if (itemExistente) {
        itemExistente.quantidade++;
      } else {
        carrinho.push({ ...item, quantidade: 1 });
      }

      localStorage.setItem('carrinho', JSON.stringify(carrinho));

      window.location.href = "./carrinho";
    } else {
      console.error('localStorage não está disponível no ambiente atual.');
    }
  }
}
