/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Product from '@modules/products/infra/typeorm/entities/Products';
import ShoppingList from './ShoppingList';

@Entity('shopping_list_products')
class ShoppingListProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ShoppingList, list => list.shopping_list_products)
  @JoinColumn({ name: 'shopping_list_id' })
  shopping_list: ShoppingList;

  @ManyToOne(() => Product, product => product.shopping_list_products)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_id: string;

  @Column()
  shopping_list_id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ShoppingListProducts;
