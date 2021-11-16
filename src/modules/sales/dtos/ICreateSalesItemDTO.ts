export interface ICreatetSalesItemsDTO {
  id_loja: number;
  id_produto: number;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
  id_venda?: number;
}
