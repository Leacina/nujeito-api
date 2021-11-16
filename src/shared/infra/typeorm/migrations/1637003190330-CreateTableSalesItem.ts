import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableSalesItem1637003190330
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_venda_item',
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
            name: 'id_venda',
            type: 'int',
          },
          {
            name: 'id_loja',
            type: 'int',
          },
          {
            name: 'quantidade',
            type: 'decimal',
          },
          {
            name: 'valor_unitario',
            type: 'decimal',
          },
          {
            name: 'valor_total',
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
      'tb_venda_item',
      new TableForeignKey({
        name: 'ProdutoVendaFK',
        columnNames: ['id_venda'],
        referencedTableName: 'tb_venda',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tb_venda_item');
  }
}
