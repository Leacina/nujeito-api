import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFieldMessageLogPayment1642436461049
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_venda',
      new TableColumn({
        name: 'mensagem_pagamento',
        type: 'varchar(500)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tb_venda', 'mensagem_pagamento');
  }
}
