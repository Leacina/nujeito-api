import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableProduto1633284546609
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'produto',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_estabelecimento',
            type: 'int',
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

    await queryRunner.createForeignKey(
      'produto',
      new TableForeignKey({
        name: 'ProdutoEstabecimentoFK',
        columnNames: ['id_estabelecimento'],
        referencedTableName: 'estabelecimento',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('produto');
  }
}
