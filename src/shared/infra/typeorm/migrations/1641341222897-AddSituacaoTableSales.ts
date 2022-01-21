import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddSituacaoTableSales1641341222897
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_venda',
      new TableColumn({
        name: 'situacao',
        type: 'char',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_venda', 'situacao');
  }
}
