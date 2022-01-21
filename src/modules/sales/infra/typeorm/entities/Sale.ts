import Shop from '@modules/establishment/infra/typeorm/entities/Shop';
import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SaleItem } from './SaleItem';

@Entity('tb_venda')
export class Sale {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  id_usuario: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;

  @Column()
  id_loja: number;

  @ManyToOne(() => Shop)
  @JoinColumn({ name: 'id_loja' })
  loja: Shop;

  @OneToMany(() => SaleItem, saleItem => saleItem.venda)
  items: SaleItem[];

  @Column()
  situacao: string;

  @Column()
  mensagem_pagamento: string;

  @Column()
  valor_total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
