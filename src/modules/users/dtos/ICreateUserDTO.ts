export default interface ICreateUserDto {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cpf: string;
  rg: string;
  cep: string;
  is_logista_nujeito: boolean;
  id_estabelecimento?: number;
  uf: string;
  cidade: string;
  bairro: string;
  logradouro: string;
}
