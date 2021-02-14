import { query } from 'express';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddImageFieldToCourses1612387135942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('courses', new TableColumn({
      name: 'image',
      type: 'varchar',
      isNullable: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('courses', 'image');
  }
}
