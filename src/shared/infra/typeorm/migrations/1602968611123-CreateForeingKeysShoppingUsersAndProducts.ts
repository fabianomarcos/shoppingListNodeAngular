import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateForeingKeysShoppingUsersAndProducts1602968611123
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'shopping_list',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'shopping_list',
      new TableForeignKey({
        name: 'ShoppingListUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.addColumn(
      'shopping_list_products',
      new TableColumn({
        name: 'shopping_list_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'shopping_list_products',
      new TableForeignKey({
        name: 'ShoppingListProductsShoppingList',
        columnNames: ['shopping_list_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'shopping_list',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.addColumn(
      'shopping_list_products',
      new TableColumn({
        name: 'product_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'shopping_list_products',
      new TableForeignKey({
        name: 'ShoppingListProductsProduct',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('shopping_list', 'ShoppingListUser');

    await queryRunner.dropColumn('shopping_list', 'user_id');

    await queryRunner.dropForeignKey(
      'shopping_list_products',
      'ShoppingListProductsShoppingList',
    );

    await queryRunner.dropColumn('shopping_list_products', 'shopping_list_id');

    await queryRunner.dropForeignKey(
      'shopping_list_products',
      'ShoppingListProductsProduct',
    );

    await queryRunner.dropColumn('shopping_list_products', 'product_id');
  }
}
