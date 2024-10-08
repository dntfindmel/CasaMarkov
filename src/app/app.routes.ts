import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VitrineComponent } from './vitrine/vitrine.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { BuscaComponent } from './busca/busca.component';

export const routes: Routes = [
  {path: "vitrine", component: VitrineComponent},
  {path: "detalhes", component: DetalhesComponent},
  {path: "carrinho", component: CarrinhoComponent},
  {path: "", component: VitrineComponent},
  {path: "login", component: LoginComponent},
  {path: "cadastro", component: CadastroComponent},
  {path: "busca", component: BuscaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
