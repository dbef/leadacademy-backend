import { Controller, Post, Body } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatedApplicationDto } from './dto/created-application-res.dto';

@Controller('application')
@ApiTags('Application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiOperation({
    summary: 'Create application',
  })
  @ApiOkResponse({
    description: 'Application successfully created',
    type: CreatedApplicationDto,
  })
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  }
}
