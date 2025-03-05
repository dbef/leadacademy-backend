import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { UpdateApplicationDtoAdmin } from './dto/update-application.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAdminAccessGuard } from '../guards/admin.guard';
import { ApplicationDto } from './dto/application.dto';

@Controller('admin/applications')
@ApiBearerAuth()
@UseGuards(JwtAdminAccessGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Application id',
    type: String,
  })
  @ApiOperation({
    summary: 'Update application status',
  })
  @ApiOkResponse({
    description: 'Application updated successfully',
  })
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDtoAdmin,
  ) {
    return this.applicationsService.update(id, updateApplicationDto);
  }

  @Get(':course_id')
  @ApiParam({
    name: 'course_id',
    required: true,
    description: 'Course id',
    type: String,
  })
  @ApiOperation({
    summary: 'fetches all applications for a course',
  })
  @ApiOkResponse({
    description: 'all applicants on course',
    type: [ApplicationDto],
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by status',
    type: String,
  })
  getAllWithCourse(
    @Param('course_id') course_id: string,
    @Query('status') status: string,
  ) {
    return this.applicationsService.getAllApplicantsByCourseId(
      course_id,
      status,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'fetches all applications for a course',
  })
  @ApiOkResponse({
    description: 'all applicants on course',
    type: [ApplicationDto],
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter by status',
    type: String,
  })
  getAll(@Query('status') status: string) {
    return this.applicationsService.getAllApplicants(status);
  }
}
