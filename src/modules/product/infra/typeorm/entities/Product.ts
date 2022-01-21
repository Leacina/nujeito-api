import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import ProductShop from './ProductShop';

@Entity('tb_produto')
class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  qt_fracionado: number;

  @Column()
  codigo_barras: number;

  @Column()
  tp_embalagem: string;

  @Column()
  ds_imagem: string;

  @OneToMany(() => ProductShop, shop => shop.produto)
  lojas: ProductShop[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
