import User from '@modules/users/infra/typeorm/entities/User';

interface IProduct {
  id: string;
  price: number;
  quantity: number;
}

export default interface ICreateShoppingListDTO {
  user: User;
  products: IProduct[];
}
