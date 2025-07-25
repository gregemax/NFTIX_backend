import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  UseGuards,
  Request
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostStatus } from './entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: any
  ) {
   
    const authorId = req.user?.id; 
    return this.postsService.create(createPostDto, authorId);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: PostStatus,
    @Query('category') category?: string
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.postsService.findAll(pageNum, limitNum, status, category);
  }

  @Get('featured')
  getFeatured(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 5;
    return this.postsService.getFeaturedPosts(limitNum);
  }

  @Get('popular')
  getPopular(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.postsService.getPopularPosts(limitNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Get(':id/likes')
  getPostLikes(@Param('id') id: string) {
    return this.postsService.getPostLikes(id);
  }

  @Post(':id/like')
  // @UseGuards(AuthGuard) // Uncomment when you have auth implemented
  likePost(
    @Param('id') id: string,
    @Request() req: any // Replace with proper user type
  ) {
    // For now, using a placeholder user ID - replace with req.user.id when auth is implemented
    const userId = req.user?.id || '507f1f77bcf86cd799439012'; // Placeholder ObjectId
    return this.postsService.likePost(id, userId);
  }

  @Delete(':id/like')
  // @UseGuards(AuthGuard) // Uncomment when you have auth implemented
  unlikePost(
    @Param('id') id: string,
    @Request() req: any // Replace with proper user type
  ) {
    // For now, using a placeholder user ID - replace with req.user.id when auth is implemented
    const userId = req.user?.id || '507f1f77bcf86cd799439012'; // Placeholder ObjectId
    return this.postsService.unlikePost(id, userId);
  }

  @Patch(':id')
  // @UseGuards(AuthGuard) // Uncomment when you have auth implemented
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard) // Uncomment when you have auth implemented
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}