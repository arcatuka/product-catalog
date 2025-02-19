import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1739792065774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "categories" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" text NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        PRIMARY KEY ("id")
      );
    `);
    await queryRunner.query(`
      INSERT INTO "categories" (id, name, description, created_at, updated_at)
      VALUES
        ('1b3e4567-e89b-12d3-a456-426614174000', 'Electronics', 'Devices and gadgets', NOW(), NOW()),
        ('2b3e4567-e89b-12d3-a456-426614174000', 'Books', 'Different kinds of books', NOW(), NOW());
    `);

    await queryRunner.query(`
      CREATE TABLE "products" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" text NOT NULL,
        "price" decimal NOT NULL,
        "image_url" character varying,
        "category_id" uuid,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        PRIMARY KEY ("id"),
        CONSTRAINT "FK_category" FOREIGN KEY ("category_id") REFERENCES "categories"("id")
      );
    `);

    await queryRunner.query(`
      INSERT INTO products (id, name, description, price, image_url, category_id, created_at, updated_at) VALUES
      ('3b3e4567-e89b-12d3-a456-426614174000', 'Smartphone', 'Latest model smartphone', 799.99, 'https://example.com/smartphone.jpg', '1b3e4567-e89b-12d3-a456-426614174000', NOW(), NOW()),
      ('4b3e4567-e89b-12d3-a456-426614174000', 'Laptop', 'High-performance laptop', 1299.99, 'https://example.com/laptop.jpg', '1b3e4567-e89b-12d3-a456-426614174000', NOW(), NOW()),
      ('5b3e4567-e89b-12d3-a456-426614174000', 'Science Book', 'A great book about science', 19.99, NULL, '2b3e4567-e89b-12d3-a456-426614174000', NOW(), NOW());
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "products" CASCADE;
    `);
    await queryRunner.query(`
      DROP TABLE IF EXISTS "categories" CASCADE;
    `);
  }
}
