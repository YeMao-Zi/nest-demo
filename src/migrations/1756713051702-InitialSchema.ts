import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1756713051702 implements MigrationInterface {
    name = 'InitialSchema1756713051702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`desc\` varchar(100) NULL, \`createTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL COMMENT '用户名', \`password\` varchar(50) NOT NULL COMMENT '密码', \`createTime\` datetime(6) NOT NULL COMMENT '创建时间' DEFAULT CURRENT_TIMESTAMP(6), \`updateTime\` datetime(6) NOT NULL COMMENT '更新时间' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`role_permission_relation\` ADD CONSTRAINT \`FK_7822b319e3e15d982d49aa50cf2\` FOREIGN KEY (\`permissionId\`) REFERENCES \`permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_role_relation\` ADD CONSTRAINT \`FK_387a09a362c32ee04b33fc4eaab\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_role_relation\` ADD CONSTRAINT \`FK_bed18db98a78c46f0bcfedfe652\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role_relation\` DROP FOREIGN KEY \`FK_bed18db98a78c46f0bcfedfe652\``);
        await queryRunner.query(`ALTER TABLE \`user_role_relation\` DROP FOREIGN KEY \`FK_387a09a362c32ee04b33fc4eaab\``);
        await queryRunner.query(`ALTER TABLE \`role_permission_relation\` DROP FOREIGN KEY \`FK_7822b319e3e15d982d49aa50cf2\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
    }

}
