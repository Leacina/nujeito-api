import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class CreateFKUserEstablishment1633283738336
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_usuario',
      new TableColumn({
        name: 'id_estabelecimento',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'tb_usuario',
      new TableForeignKey({
        name: 'UsuarioEstabelecimentoFK',
        columnNames: ['id_estabelecimento'],
        referencedTableName: 'tb_estabelecimento',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_usuario', 'UsuarioEstabelecimentoFK');

    await queryRunner.dropColumn('tb_usuario', 'id_estabebelecimento');
  }
}
