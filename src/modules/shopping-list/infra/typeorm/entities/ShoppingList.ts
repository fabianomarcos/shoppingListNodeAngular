/* eslint-disable camelcase */
import User from '@modules/users/infra/typeorm/entities/User';
import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import ShoppingListsProducts from './ShoppingListProducts';

@Entity('shopping_list')
class ShoppingList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => ShoppingListsProducts,
    list_products => list_products.shopping_list,
    {
      cascade: true,
    },
  )
  shopping_list_products: ShoppingListsProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ShoppingList;
