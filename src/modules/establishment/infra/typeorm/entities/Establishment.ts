import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Shop from './Shop';

@Entity('tb_estabelecimento')
class Establishment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  cnpj: string;

  @Column()
  uf: string;

  @Column()
  cidade: string;

  @Column()
  bairro: string;

  @Column()
  logradouro: string;

  @OneToMany(() => Shop, shop => shop.estabelecimento)
  lojas: Shop[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Establishment;
