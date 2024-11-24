import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  public mensagem: string = "";
  public obj: Cliente = new Cliente();

  constructor(private service: ClienteService) {}
  //Criado para todas as comunicações com as APIs

  ngOnInit() {
    this.carregar();
  } //Também é boa pratica usar assim em vez de colocar dentro do construtor para ele forçar o carregar quando abre a tela

  public gravar() {
    if (this.validarCampos()) {   
      this.obj.id = 0; //Adicionado para quando tivar alguma coisa carregada não fazer alterações em dados existentes
      this.service.gravar(this.obj).subscribe({
        next: (msg) => (this.mensagem = msg),
        error: (err) => (this.mensagem = "Ocorreu um erro ao tentar cadastrar."),
      });
      localStorage.setItem("cliente", JSON.stringify(this.obj));
    } else {
      this.mensagem = "Por favor, preencha os campos obrigatórios corretamente.";
    }
  }

  public pesquisar() {
    if (this.validarEmail(this.obj.email)){ //Valida se tem coisa digitada certa no campo de email, utilizado para pesquisa
      this.service.pesquisarEmail(this.obj.email).subscribe({
        next: (data) => {          
          if(!data){ //valida se trouxe alguma coisa do back, se não trouxe nada, o data fica nulo e vai pro else
            this.mensagem = "Registro não encontrado!"
          } else {
            this.mensagem = "Cliente encontrado com sucesso";
            this.obj = data;
          }          
        },
        error: (err) => (this.mensagem = "Ocorreu um erro ao tentar pesquisar."),
      })
    } else if (this.obj.email==""){
      this.mensagem="Campo Email vazio! Não foi possível pesquisar."
    } else {
      this.mensagem="Insira um email valido para pesquisar!"
    }
  }

  public carregar() {
    if (typeof window !== 'undefined' && localStorage) {
      let json = localStorage.getItem("cliente");
      if (json == null) {
        window.location.href = "./login";
      } else {
        this.obj = JSON.parse(json);
      }
    } else {
      console.warn('localStorage não está disponível no ambiente atual.');
    }
  }

  public remover() { //Remoção é perigoso, melhor colocar esse monte de checagem pra não apagar nada por engano
    if (this.validarEmail(this.obj.email)) {
      this.service.pesquisarEmail(this.obj.email).subscribe({ // Faz a pesquisa antes de tentar deletar, se não encontra nada no banco nem tenta
        next: (data) => {
          if (!data) {
            this.mensagem = "Registro não encontrado!";
          } else {
            // Se o email existe, perguntar pela confirmação
            const confirmacao = window.confirm('Você tem certeza que deseja excluir o cliente?');
            if (confirmacao) {
              this.service.delete(this.obj.email).subscribe({ //Aparentemente o subscribe faz execução assincrona, então precisa ficar aqui dentro, eu tentei colocar fora, mas o assincrono não deixou funcionar fora
                next: (data) => {
                  this.mensagem = data;
                  localStorage.removeItem("cliente");
                  // Precisaria colocar algo para limpar os campos, mas não encontrei algum comando que faça isso sozinho, deixei só o do id para não alterar nada no banco
                },
                error: (err) => {
                  this.mensagem = "Não foi possível excluir o cliente agora. Tente novamente mais tarde.";
                }
              });
            } else {
              this.mensagem = "Exclusão não confirmada"
            }
          }
        },
        error: (err) => {
          this.mensagem = "Ocorreu um erro ao tentar pesquisar.";
        }
      });
    } else if (this.obj.email == "") {
      this.mensagem = "Campo Email vazio! Não foi possível pesquisar.";
    } else {
      this.mensagem = "Insira um email válido para pesquisar!";
    }
  }

  private validarCampos(): boolean {
    const nomeValido = !!this.obj.nome && this.obj.nome.trim().length > 0;
    const senhaValida = !!this.obj.senha && this.obj.senha.trim().length > 0;
    const emailValido = this.validarEmail(this.obj.email);
    const telefoneValido = !!this.obj.telefone && this.obj.telefone.length <= 11;
    return nomeValido && emailValido && telefoneValido && senhaValida;
  }

  public validarEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}
