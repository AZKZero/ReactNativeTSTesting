import {MigrationInterface} from 'typeorm';
import {QueryRunner} from 'typeorm';

export class Migration implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query(
      'CREATE TABLE "author" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text)',
    );
  }
  async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query(
      'CREATE TABLE "blog" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text, "body" text, "authorId" integer)',
    );
  }
}
