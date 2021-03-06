import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';
import {Blog} from './blog';

@Entity('author')
export class Author {
  // @ts-ignore
  @PrimaryColumn('int', {generated: 'increment'})
  id: number;

  @Column('text', {nullable: true})
  name: string;

  @OneToMany(() => Blog, blog => blog.author, {cascade: false, nullable: true})
  blogs: Blog[];
}
