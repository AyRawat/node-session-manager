import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1624113550516 implements MigrationInterface {
    name = 'initial1624113550516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create User table
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "username" text NOT NULL, 
                "mobile_number" text NOT NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "PK_user_id" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_mobile_number" UNIQUE ("mobile_number"),
                CONSTRAINT "UQ_username" UNIQUE ("username")
            )
        `);

        // Create Session table
        await queryRunner.query(`
            CREATE TABLE "session" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "session_key" text NOT NULL, 
                "user_agent" text NOT NULL, 
                "ip_address" text NOT NULL, 
                "is_active" boolean NOT NULL DEFAULT true, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "userId" uuid, 
                CONSTRAINT "PK_session_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user_session" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop Session table first due to foreign key constraints
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
