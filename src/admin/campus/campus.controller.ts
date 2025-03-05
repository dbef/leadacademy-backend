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
import { CampusService } from './campus.service';
import { CreateCampusDto } from './dto/create-campus.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAdminAccessGuard } from '../guards/admin.guard';
import { CampusDto } from './dto/campus.dto';

@Controller('admin/campus')
@ApiBearerAuth()
@UseGuards(JwtAdminAccessGuard)
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new campus',
    description: 'Create',
  })
  @ApiOkResponse({
    description: 'Campus created successfully',
    type: CampusDto,
  })
  create(@Body() createCampusDto: CreateCampusDto) {
    return this.campusService.create(createCampusDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all campuses',
    description: 'Get all campuses',
  })
  @ApiOkResponse({
    description: 'Campuses fetched successfully',
    type: [CampusDto],
  })
  findAll() {
    return this.campusService.findAll();
  }

  @Get(':campus_name')
  @ApiParam({
    name: 'campus_name',
    type: String,
    description: 'Campus name',
  })
  @ApiOkResponse({
    description: 'Campus fetched successfully',
    type: CampusDto,
  })
  findOne(@Param('campus_name') campus_name: string) {
    return this.campusService.findOne(campus_name);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Campus ID',
  })
  update(@Param('id') id: string, @Body() createCampusDto: CreateCampusDto) {
    return this.campusService.update(id, createCampusDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a campus',
    description: 'Delete a campus',
  })
  @ApiOkResponse({
    description: 'Campus deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.campusService.remove(id);
  }
}
