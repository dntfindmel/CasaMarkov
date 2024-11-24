import { Component } from '@angular/core';
import { Cliente } from '../model/cliente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public mensagem: String = "";
  public obj : Cliente = new Cliente();

  constructor (private service: ClienteService) {}

  public fazerLogin(){
    this.service.login(this.obj).subscribe({
      next: (data) => {
        this.obj = data;
        localStorage.setItem("cliente", JSON.stringify(this.obj));
        window.location.href="./cadastro"; //Requisito da atividade, quando logar, puxar todos os dados do login feito e colocar na tela de cadastro
      },
      error: (err) => {
        if (err.status === 401) { //Pesquisei e aparentemente essa é a boa pratica para quando o login falha 401 access denied ou algo assim
          this.mensagem = "Email ou senha inválidos. Tente novamente.";
          localStorage.removeItem("cliente");
        } else {
          this.mensagem = "Ocorreu um erro no login. Tente mais tarde.";
          localStorage.removeItem("cliente");
        }            
      }
    })
  }

  public esqueciSenha(){ //Não criei tela nova, mas colocar o email no campo de login e clicar em esqueci a senha, ele busca no banco se o email existe,se sim mostra a mensagem de email enviado, apesar de não enviar nada
    this.service.pesquisarEmail(this.obj.email).subscribe ({
      next: (data) => {
        if(data){
          this.mensagem = "Email de recuperação de senha enviado para sua caixa de entrada!"
        } else {
          this.mensagem = "Email não cadastrado ou digitado incorretamente."
        } 
      }
    })
  }
  

  public novoCadastro(){
    localStorage.setItem("cliente", JSON.stringify(this.obj));
    window.location.href="./cadastro";
  }
}
