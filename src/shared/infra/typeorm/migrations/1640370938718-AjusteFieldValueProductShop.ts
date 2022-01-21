import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AjusteFieldValueProductShop1640370938718
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `tb_produto_loja` MODIFY `valor` DECIMAL(10,2)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `tb_produto_loja` MODIFY `valor` DECIMAL',
    );
  }
}
