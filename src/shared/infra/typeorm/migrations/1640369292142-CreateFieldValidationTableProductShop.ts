import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateFieldValidationTableProductShop1640369292142
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_produto_loja',
      new TableColumn({
        name: 'validade',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_produto_loja', 'validade');
  }
}
