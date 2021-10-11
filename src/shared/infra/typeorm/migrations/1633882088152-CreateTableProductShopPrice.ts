import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableProductShopPrice1633882088152
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_produto_loja',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_produto',
            type: 'int',
          },
          {
            name: 'id_loja',
            type: 'int',
          },
          {
            name: 'valor',
            type: 'decimal',
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
      'tb_produto_loja',
      new TableForeignKey({
        name: 'ProdutoPrecoLojaFK',
        columnNames: ['id_loja'],
        referencedTableName: 'tb_loja',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'tb_produto_loja',
      new TableForeignKey({
        name: 'ProdutoPrecoFK',
        columnNames: ['id_produto'],
        referencedTableName: 'tb_produto',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_produto_loja');
  }
}
