import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm/browser';
import {Blog} from './blog';

@Entity('author')
export class Author {
  // @ts-ignore
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {nullable: true})
  name: string;

  @OneToMany(() => Blog, blog => blog.author)
  blogs: Blog[];

  constructor(name: string) {
    this.name = name;
  }
}
