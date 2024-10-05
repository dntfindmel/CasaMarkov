import { Routes } from '@angular/router';
import { VitrineComponent } from './vitrine/vitrine.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';

export const routes: Routes = [
  {path: "vitrine", component: VitrineComponent},
  {path: "detalhes", component: DetalhesComponent},
  {path: "carrinho", component: CarrinhoComponent},
  {path: "", component: VitrineComponent}
];
