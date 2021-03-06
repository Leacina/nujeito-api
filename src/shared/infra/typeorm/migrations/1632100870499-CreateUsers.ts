import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1632100870499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_usuario',
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
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar(100)',
            isUnique: true,
          },
          {
            name: 'senha',
            type: 'varchar(600)',
          },
          {
            name: 'telefone',
            type: 'varchar(20)',
          },
          {
            name: 'cpf',
            type: 'varchar(20)',
          },
          {
            name: 'is_logista_nujeito',
            type: 'boolean',
            default: false,
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
    await queryRunner.dropTable('tb_usuario');
  }
}
