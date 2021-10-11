import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTableProduct1633284546609
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_produto',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar(200)',
          },
          {
            name: 'valor',
            type: 'decimal',
          },
          {
            name: 'qt_estoque',
            type: 'int',
          },
          {
            name: 'qt_fracionado',
            type: 'int',
          },
          {
            name: 'codigo_barras',
            type: 'bigint',
            isUnique: true,
          },
          {
            name: 'tp_embalagem',
            type: 'varchar(2)',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_produto');
  }
}
