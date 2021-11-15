import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Shop from '@modules/establishment/infra/typeorm/entities/Shop';
import Product from './Product';

@Entity('tb_produto_loja')
class ProductShop {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  id_produto: number;

  @Column()
  id_loja: number;

  @ManyToOne(() => Shop)
  @JoinColumn({ name: 'id_loja' })
  loja: Shop;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'id_produto' })
  produto: Product;

  @Column()
  valor: number;

  @Column()
  qt_estoque: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductShop;
