import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

// 创建 复合索引 name-type
@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  // 创建索引
  @Index()
  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
