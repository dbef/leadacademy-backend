import { Controller, Get, Query } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { FileDtoRt } from '../admin/files/dto/file-rt.dto';
import { GlobalQueryDto } from '../global/global.query';
import { FileDto } from '../admin/files/dto/file.dto';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of all media files',
    type: FileDtoRt,
  })
  findAll(@Query() query: GlobalQueryDto) {
    return this.galleryService.findAll(query);
  }

  @Get('cover')
  @ApiOkResponse({
    description: 'List of all media files',
    type: [FileDto],
  })
  coverImages() {
    return this.galleryService.coverImages();
  }
}
