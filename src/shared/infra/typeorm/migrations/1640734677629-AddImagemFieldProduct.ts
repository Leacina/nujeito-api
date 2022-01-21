import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddImagemFieldProduct1640734677629
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_produto',
      new TableColumn({
        name: 'ds_imagem',
        type: 'varchar(500)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_produto', 'ds_imagem');
  }
}
