/* eslint-disable camelcase */
import ShoppingListsProducts from '@modules/shopping-list/infra/typeorm/entities/ShoppingListProducts';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @OneToMany(() => ShoppingListsProducts, listProducts => listProducts.product)
  shopping_list_products: ShoppingListsProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
