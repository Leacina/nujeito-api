import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Establishment from '@modules/establishment/infra/typeorm/entities/Establishment';

@Entity('tb_usuario')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;

  @Column()
  cep: string;

  @Column()
  telefone: string;

  @Column()
  is_logista_nujeito: boolean;

  @Column()
  id_estabelecimento: number;

  @ManyToOne(() => Establishment)
  @JoinColumn({ name: 'id_estabelecimento' })
  estabelecimento: Establishment;

  @Column()
  uf: string;

  @Column()
  cidade: string;

  @Column()
  bairro: string;

  @Column()
  logradouro: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
