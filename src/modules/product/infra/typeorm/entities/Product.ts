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

@Entity('produto')
class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  valor: number;

  @Column()
  qt_estoque: number;

  @Column()
  qt_fracionado: number;

  @Column()
  codigo_barras: number;

  @Column()
  tp_embalagem: string;

  @ManyToOne(() => Establishment)
  @JoinColumn({ name: 'id_estabelecimento' })
  estabelecimento: Establishment;

  @Column()
  id_estabelecimento: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
