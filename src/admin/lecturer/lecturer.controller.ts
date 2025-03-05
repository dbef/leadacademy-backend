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
import { LecturerService } from './lecturer.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { ApiBearerAuth, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { JwtAdminAccessGuard } from '../guards/admin.guard';
import { LecturerDto } from './dto/lecturer.dto';

@Controller('admin/lecturer')
@ApiBearerAuth()
@UseGuards(JwtAdminAccessGuard)
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @Post()
  @ApiOkResponse({
    description: 'Lecturer created',
    type: LecturerDto,
  })
  create(@Body() createLecturerDto: CreateLecturerDto) {
    return this.lecturerService.create(createLecturerDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Lecturer created',
    type: [LecturerDto],
  })
  findAll() {
    return this.lecturerService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Lecturer id',
  })
  @ApiOkResponse({
    description: 'Lecturer created',
    type: LecturerDto,
  })
  findOne(@Param('id') id: string) {
    return this.lecturerService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Lecturer id',
  })
  @ApiOkResponse({
    description: 'Lecturer created',
    type: LecturerDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateLecturerDto: CreateLecturerDto,
  ) {
    return this.lecturerService.update(id, updateLecturerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lecturerService.remove(id);
  }
}
