import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Post()
  async create(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postsService.create(post);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() post: PostEntity): Promise<[number, PostEntity[]]> {
    return this.postsService.update(id, post);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.postsService.delete(id);
  }
}
