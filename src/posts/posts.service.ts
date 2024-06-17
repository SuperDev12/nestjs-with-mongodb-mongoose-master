import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.findAll();
  }

  async create(post: Post): Promise<Post> {
    return this.postModel.create(post);
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findOne({ where: { id } });
  }

  async update(id: string, post: Post): Promise<[number, Post[]]> {
    const [numberOfAffectedRows, affectedRows] = await this.postModel.update(post, {
      where: { id },
      returning: true,
    });
    return [numberOfAffectedRows, affectedRows as unknown as Post[]]; 
  }

  async delete(id: string): Promise<void> {
    const post = await this.findOne(id);
    await post.destroy();
  }
}
