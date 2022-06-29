import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Author} from './author';
import {JoinColumn} from 'typeorm';

@Entity('blog')
export class Blog {
  constructor(title: string, body: string, author: Author) {
    this.title = title;
    this.body = body;
    this.author = author;
  }

  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column('text', {nullable: true})
  title: string;

  @Column('text', {nullable: true})
  body: string;

  @ManyToOne(() => Author, author => author.blogs, {
    cascade: true,
  })
  @JoinColumn()
  author: Author;
}
