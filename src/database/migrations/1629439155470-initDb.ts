import {MigrationInterface, QueryRunner} from "typeorm";

export class initDb1629439155470 implements MigrationInterface {
    name = 'initDb1629439155470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin"."user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "token" character varying, "token_expired" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_4d0392574f49340bb75a102b041" UNIQUE ("username"), CONSTRAINT "PK_a28028ba709cd7e5053a86857b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin"."refresh_token" ("id" BIGSERIAL NOT NULL, "user_id" uuid NOT NULL, "token" character varying NOT NULL, "expired_at" TIMESTAMP NOT NULL, "ip_address" character varying(50) NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2df9ac0ddc206100ae8fe38afe0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "admin"."refresh_token" ADD CONSTRAINT "FK_ca406b974afc0c2a06a830ddbcb" FOREIGN KEY ("user_id") REFERENCES "admin"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin"."refresh_token" DROP CONSTRAINT "FK_ca406b974afc0c2a06a830ddbcb"`);
        await queryRunner.query(`DROP TABLE "admin"."refresh_token"`);
        await queryRunner.query(`DROP TABLE "admin"."user"`);
    }

}
