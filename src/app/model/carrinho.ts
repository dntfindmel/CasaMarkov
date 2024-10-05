import { Item } from "./item";
import { Cliente } from "./cliente";

export class Carrinho {
  public id: number = 0;
  public cliente: Cliente = new Cliente();
  public total: number = 0;
  public itens: Item[] = [];
}

