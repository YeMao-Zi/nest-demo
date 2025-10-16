import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitRoleData1756709983287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 插入管理员角色
    await queryRunner.query(
      `INSERT INTO \`role\` (\`name\`, \`createTime\`, \`updateTime\`) VALUES (?, NOW(), NOW())`,
      ['管理员'],
    );

    // 插入普通用户角色
    await queryRunner.query(
      `INSERT INTO \`role\` (\`name\`, \`createTime\`, \`updateTime\`) VALUES (?, NOW(), NOW())`,
      ['普通用户'],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 删除创建的角色
    await queryRunner.query(`DELETE FROM \`role\` WHERE \`name\` IN (?, ?)`, [
      '管理员',
      '普通用户',
    ]);
  }
}
