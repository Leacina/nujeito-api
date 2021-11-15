import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Establishment from './Establishment';

@Entity('tb_loja')
class Shop {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  id_estabelecimento: number;

  @ManyToOne(() => Establishment)
  @JoinColumn({ name: 'id_estabelecimento' })
  estabelecimento: Establishment;
}

export default Shop;
