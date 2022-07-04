import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,

} from 'typeorm';
import {Author} from './author-active';
import {JoinColumn} from 'typeorm';

@Entity()
export class Blog extends BaseEntity {
  constructor(title: string, body: string, author: Author) {
    super();
    this.title = title;
    this.body = body;
    this.author = author;
  }

  @PrimaryColumn('int', {generated: 'increment'})
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
