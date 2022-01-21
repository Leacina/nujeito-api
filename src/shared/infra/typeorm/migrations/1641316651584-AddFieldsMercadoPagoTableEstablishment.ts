import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldsMercadoPagoTableEstablishment1641316651584
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_estabelecimento',
      new TableColumn({
        name: 'chave_mercado_pago',
        type: 'varchar(500)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_estabelecimento', 'chave_mercado_pago');
  }
}
