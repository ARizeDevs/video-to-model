import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1692285013535 implements MigrationInterface {
    name = 'InitialMigration1692285013535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "luma-api-keys" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "uid" uuid NOT NULL, "email" character varying NOT NULL, "apiKey" character varying NOT NULL, "remainingCredit" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_a71fa51457ff622ebdb75241cce" UNIQUE ("uid"), CONSTRAINT "UQ_b7e767609058f03e4a28cd8d115" UNIQUE ("apiKey"), CONSTRAINT "PK_f30d40b7c5013636280617239e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "demands" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "uid" uuid NOT NULL, "name" character varying NOT NULL, "callbackUrl" character varying NOT NULL DEFAULT '', "videoUrl" character varying, CONSTRAINT "UQ_a5de3687c014d25a4162eb3b2a7" UNIQUE ("uid"), CONSTRAINT "PK_d63565b0747a0cfc73e319bfc03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "luma-captures" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "uid" uuid NOT NULL, "slug" uuid NOT NULL, "signedUrl" character varying, "capture" jsonb NOT NULL, "getCapture" jsonb, "progress" integer NOT NULL DEFAULT '0', "status" character varying NOT NULL DEFAULT 'not-started', "lumaApiKeyId" integer NOT NULL, "demandId" integer, CONSTRAINT "UQ_717f2d69c2c4df9aa667549a0bb" UNIQUE ("uid"), CONSTRAINT "PK_efc5133034e776fde3b668f15c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "luma-captures" ADD CONSTRAINT "FK_48d73895615b41993cf3a0943a5" FOREIGN KEY ("lumaApiKeyId") REFERENCES "luma-api-keys"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "luma-captures" ADD CONSTRAINT "FK_e259ad84bc3e66cb07eab14e317" FOREIGN KEY ("demandId") REFERENCES "demands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "luma-captures" DROP CONSTRAINT "FK_e259ad84bc3e66cb07eab14e317"`);
        await queryRunner.query(`ALTER TABLE "luma-captures" DROP CONSTRAINT "FK_48d73895615b41993cf3a0943a5"`);
        await queryRunner.query(`DROP TABLE "luma-captures"`);
        await queryRunner.query(`DROP TABLE "demands"`);
        await queryRunner.query(`DROP TABLE "luma-api-keys"`);
    }

}
