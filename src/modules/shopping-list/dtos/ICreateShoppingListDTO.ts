import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateShoppingListDTO {
  user: User;
  products: {
    id: string;
    quantity: number;
    price: number;
  }[];
}
