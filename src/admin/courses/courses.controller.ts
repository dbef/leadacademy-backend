import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { EditCourseDto } from './dto/update-course.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAdminAccessGuard } from '../guards/admin.guard';
import { GetAdmin } from '../decorators/admin.decorator';
import { CourseDto } from './dto/course.dto';

@Controller('admin/courses')
@ApiTags('Courses')
@ApiBearerAuth()
@UseGuards(JwtAdminAccessGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create course',
  })
  @ApiOkResponse({
    description: 'Course successfully created',
    type: CourseDto,
  })
  create(
    @Body() createCourseDto: CreateCourseDto,
    @GetAdmin() admin_id: string,
  ) {
    return this.coursesService.create(createCourseDto, admin_id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Edit course',
  })
  @ApiOkResponse({
    description: 'Course successfully updated',
    type: CourseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Course ID',
    type: 'string',
  })
  findOne(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit course',
  })
  @ApiOkResponse({
    description: 'Course successfully updated',
    type: CourseDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Course ID',
    type: 'string',
  })
  update(@Param('id') id: string, @Body() updateCourseDto: EditCourseDto) {
    return this.coursesService.editCourse(updateCourseDto, id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete course',
  })
  @ApiOkResponse({
    description: 'Course successfully deleted',
  })
  @ApiParam({
    name: 'id',
    description: 'Course ID',
    type: 'string',
  })
  remove(@Param('id') id: string) {
    return this.coursesService.deleteCourse(id);
  }
}
