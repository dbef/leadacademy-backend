import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Param,
  Delete,
  UseGuards,
  Body,
  Patch,
  Get,
  Query,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UploadedFilesDto } from './dto/uploaded-files.dto';
import { JwtAdminAccessGuard } from '../guards/admin.guard';
import { FolderDto } from './dto/folder-dto';
import { CreateFolderDto } from './dto/create-folder.dto';
import { FileDto } from './dto/file.dto';
import { FileDtoRt } from './dto/file-rt.dto';
import { FileQueryDto } from './dto/file-query.dto';

@Controller('admin/files')
@ApiTags('Files')
@ApiBearerAuth()
@UseGuards(JwtAdminAccessGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload/:folder_name')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiConsumes('multipart/form-data') // Specifies multipart form data for file uploads
  @ApiParam({
    name: 'folder_name',
    required: true,
    description: 'Folder name to upload files',
    type: String,
  })
  @ApiOperation({
    summary: 'Upload files',
  })
  @ApiOkResponse({
    description: 'Files successfully uploaded',
    type: [UploadedFilesDto],
  })
  @ApiBody({
    description: 'List of files to upload',
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('folder_name') folderName: string,
  ) {
    return this.filesService.uploadFiles(files, folderName);
  }

  @Post('upload/by-folder/:folder_name')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiConsumes('multipart/form-data') // Specifies multipart form data for file uploads
  @ApiParam({
    name: 'folder_name',
    required: true,
    description: 'Folder name to upload files',
    type: String,
  })
  @ApiOperation({
    summary: 'Upload files',
  })
  @ApiOkResponse({
    description: 'Files successfully uploaded',
    type: [FileDto],
  })
  @ApiBody({
    description: 'List of files to upload',
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async uploadFilesByFolder(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('folder_name') folderName: string,
  ) {
    return this.filesService.uploadFilesByFolder(files, folderName);
  }

  @Delete(':file_name')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiParam({
    name: 'file_name',
    required: true,
    description: 'file name to delete',
    type: String,
  })
  @ApiOperation({
    summary: 'remove files',
  })
  @ApiOkResponse({
    description: 'Files successfully removed',
  })
  async deleteFile(@Param('file_name') fileName: string) {
    return this.filesService.removeImage(fileName);
  }

  @Post('create-folder')
  @ApiOperation({
    summary: 'Create folder',
  })
  @ApiOkResponse({
    description: 'Folder successfully created',
    type: FolderDto,
  })
  async createFolder(@Body() createFolderDto: CreateFolderDto) {
    return this.filesService.createFolder(createFolderDto);
  }

  @Patch('update-folder/:folder_id')
  @ApiOperation({
    summary: 'Update folder',
  })
  @ApiOkResponse({
    description: 'Folder successfully updated',
    type: FolderDto,
  })
  @ApiParam({
    type: String,
    name: 'folder_id',
    description: 'Folder id to update',
    required: true,
  })
  async updateFolder(
    @Body() createFolderDto: CreateFolderDto,
    @Param('folder_id') folderId: string,
  ) {
    return this.filesService.updateFolder(createFolderDto, folderId);
  }

  @Get('folders')
  @ApiOperation({
    summary: 'Get all folders',
  })
  @ApiOkResponse({
    description: 'All folders successfully fetched',
    type: [FolderDto],
  })
  async getAllFolders() {
    return this.filesService.getAllFolders();
  }

  @Get()
  @ApiOperation({
    summary: 'Get all files for admin',
  })
  @ApiOkResponse({
    description: 'All folders successfully fetched',
    type: FileDtoRt,
  })
  async getAllfiles(@Query() query: FileQueryDto) {
    return this.filesService.findAll(query);
  }
}
