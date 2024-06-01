import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRoleAndUserTableMigration1717149940180 implements MigrationInterface {
    name = 'UpdateRoleAndUserTableMigration1717149940180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "UserRoles" ("usersId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_41f29aa90a36836859f102ad6c7" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_80547a481dff59f01c1cc7ef3a" ON "UserRoles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_98cefa4e99eff3fd0c9116431c" ON "UserRoles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "UserRoles" ADD CONSTRAINT "FK_80547a481dff59f01c1cc7ef3a2" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "UserRoles" ADD CONSTRAINT "FK_98cefa4e99eff3fd0c9116431ca" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserRoles" DROP CONSTRAINT "FK_98cefa4e99eff3fd0c9116431ca"`);
        await queryRunner.query(`ALTER TABLE "UserRoles" DROP CONSTRAINT "FK_80547a481dff59f01c1cc7ef3a2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_98cefa4e99eff3fd0c9116431c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_80547a481dff59f01c1cc7ef3a"`);
        await queryRunner.query(`DROP TABLE "UserRoles"`);
    }

}
