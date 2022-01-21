import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldsMercadopagoTableEstablishment1641426548210
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_estabelecimento',
      new TableColumn({
        name: 'token_mercado_pago',
        type: 'varchar(500)',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'tb_estabelecimento',
      new TableColumn({
        name: 'taxa',
        type: 'decimal(10,2)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_estabelecimento', 'token_mercado_pago');
    await queryRunner.dropColumn('tb_estabelecimento', 'taxa');
  }
}
