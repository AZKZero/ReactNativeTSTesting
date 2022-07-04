import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn,
  BaseEntity,
} from 'typeorm';
import {Blog} from './blog-active';

@Entity()
export class Author extends BaseEntity {
  // @ts-ignore
  @PrimaryColumn('int', {generated: 'increment'})
  id: number;

  @Column('text', {nullable: true})
  name: string;

  @OneToMany(() => Blog, blog => blog.author, {cascade: false, nullable: true})
  blogs: Blog[];
}
