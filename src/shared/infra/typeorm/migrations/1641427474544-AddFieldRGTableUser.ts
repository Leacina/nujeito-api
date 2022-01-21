import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldRGTableUser1641427474544
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_usuario',
      new TableColumn({
        name: 'rg',
        type: 'varchar(20)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_usuario', 'rg');
  }
}
