import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Shop from '@modules/establishment/infra/typeorm/entities/Shop';
import Product from './Product';

Entity('tb_produto_loja');
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
}

export default ProductShop;
