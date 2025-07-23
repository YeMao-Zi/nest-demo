import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'typeorm_users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;
}
