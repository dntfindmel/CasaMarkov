import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';

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

  public gravar() {
    // Verifica se os campos necessários são válidos antes de salvar
    if (this.validarCampos()) {
      localStorage.setItem("cliente", JSON.stringify(this.obj));
      this.mensagem = "Cadastro realizado com sucesso!";
    } else {
      this.mensagem = "Por favor, preencha os campos obrigatórios corretamente.";
    }
  }

  public carregar() {
    let json = localStorage.getItem("cliente");
    if (json == null) {
      window.location.href = "./login";
    } else {
      this.obj = JSON.parse(json);
    }
  }

  constructor() {
    this.carregar();
  }

  private validarCampos(): boolean {
    const nomeValido = !!this.obj.nome && this.obj.nome.trim().length > 0;
    const senhaValida = !!this.obj.senha && this.obj.senha.trim().length > 0;  
    const emailValido = this.validarEmail(this.obj.email);
    const telefoneValido = !!this.obj.telefone && this.obj.telefone.length <= 11;  // Garante que telefone não é undefined
    return nomeValido && emailValido && telefoneValido && senhaValida;
  }


  public validarEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
}
