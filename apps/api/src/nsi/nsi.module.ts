import { Module } from '@nestjs/common';

import { DepartmentController } from './department/department.controller';
import { PositionController } from './position/positiion.controller';
import { ThemeController } from './theme/theme.controller';
import { PostController } from './post/post.controller';

import { DepartmentService } from './department/department.service';
import { PositionService } from './position/position.service';
import { ThemeService } from './theme/theme.service';
import { PostService } from './post/post.service';

@Module({
  controllers: [
    DepartmentController,
    PostController,
    PositionController,
    ThemeController,
  ],
  providers: [DepartmentService, PostService, PositionService, ThemeService],
})
export class NsiModule {}
