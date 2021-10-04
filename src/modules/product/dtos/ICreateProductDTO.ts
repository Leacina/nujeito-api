export default interface ICreateProductDTO {
  id_estabelecimento: number;
  nome: string;
  valor: number;
  qt_estoque: number;
  qt_fracionado: number;
  codigo_barras: number;
  tp_embalagem: string;
}
