export default interface ICreateUserDto {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cpf: string;
  is_logista_nujeito: boolean;
  id_estabelecimento?: number;
}
