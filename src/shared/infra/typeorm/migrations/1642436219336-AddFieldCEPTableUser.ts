import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldCEPTableUser1642436219336
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_usuario',
      new TableColumn({
        name: 'cep',
        type: 'varchar(20)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_usuario', 'cep');
  }
}
