import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEstablishment1633282548998
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_estabelecimento',
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
            type: 'varchar(50)',
          },
          {
            name: 'cnpj',
            type: 'varchar(20)',
            isNullable: true,
          },
          {
            name: 'uf',
            type: 'varchar(2)',
          },
          {
            name: 'cidade',
            type: 'varchar(50)',
          },
          {
            name: 'bairro',
            type: 'varchar(50)',
          },
          {
            name: 'logradouro',
            type: 'varchar(100)',
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
    await queryRunner.dropTable('tb_estabelecimento');
  }
}
