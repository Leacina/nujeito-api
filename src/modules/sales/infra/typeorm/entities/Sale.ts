import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { SaleItem } from './SaleItem';

@Entity('tb_venda')
export class Sale {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  id_usuario: number;

  @Column()
  id_loja: number;

  @OneToMany(() => SaleItem, saleItem => saleItem.venda)
  items: SaleItem[];

  @Column()
  valor_total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
