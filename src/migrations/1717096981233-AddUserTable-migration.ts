import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTableMigration1717096981233 implements MigrationInterface {
    name = 'AddUserTableMigration1717096981233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying, "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "phoneNumber" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
