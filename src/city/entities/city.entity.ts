import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createTime: Date;

  @TreeChildren({ cascade: true })
  children: City[];

  @TreeParent({ onDelete: 'CASCADE' })
  parent: City | null;
}
