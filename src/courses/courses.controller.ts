import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CourseDto } from '../admin/courses/dto/course.dto';

@Controller('courses')
@ApiTags('Courses - public')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all courses',
  })
  @ApiOkResponse({
    description: 'List of all courses',
    type: [CourseDto],
  })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get course by id',
  })
  @ApiOkResponse({
    description: 'Course found',
    type: CourseDto,
  })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }
}
