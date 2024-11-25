import { Produto } from "./produto";

export class Item {
  public id: number = 0;
  public produto: Produto = new Produto();
  public quantidade: number = 0;
  public valor: number = 0;
  public pedidoId: number = 0;
}
