import { Controller, Get } from '@nestjs/common';
import { CampusService } from './campus.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { CampusDto } from '../admin/campus/dto/campus.dto';

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all Campuses',
    type: [CampusDto],
  })
  findAllCampuses() {
    return this.campusService.findAll();
  }
}
