import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sale } from './Sale';

@Entity('tb_venda_item')
export class SaleItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  id_produto: number;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'id_venda' })
  venda: Sale;

  @Column()
  id_loja: number;

  @Column()
  id_venda: number;

  @Column()
  quantidade: number;

  @Column()
  valor_unitario: number;

  @Column()
  valor_total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
