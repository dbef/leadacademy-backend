import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { UploadedFilesDto } from './dto/uploaded-files.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { FolderDto } from './dto/folder-dto';
import { FileDto } from './dto/file.dto';
import { FileDtoRt } from './dto/file-rt.dto';
import { FileQueryDto } from './dto/file-query.dto';

@Injectable()
export class FilesService {
  private readonly s3: S3Client;

  constructor(private prisma: PrismaService) {
    this.s3 = new S3Client({
      region: process.env.REGION_AWS,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_AWS,
        secretAccessKey: process.env.SECRET_KEY_AWS,
      },
    });
  }
  async uploadFiles(
    files: Express.Multer.File[],
    folderName: string,
  ): Promise<UploadedFilesDto[]> {
    if (!files.length) {
      throw new ConflictException('No files uploaded');
    }

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const fileName = `${Date.now()}-${file.originalname}`;

        const key = `${folderName}/${fileName}`;
        const params = {
          Bucket: process.env.BUCKET_NAME_AWS,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        const upload = new Upload({
          client: this.s3,
          params,
        });

        const result = await upload.done();

        return {
          url: result.Location,
          type: file.mimetype,
          original_name: fileName,
          location: folderName,
        };
      }),
    );

    return uploadedFiles;
  }

  async uploadFilesByFolder(
    files: Express.Multer.File[],
    folderName: string,
  ): Promise<FileDto[]> {
    if (!files.length) {
      throw new ConflictException('No files uploaded');
    }

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        const fileName = `${randomNumber}-${file.originalname}`;

        const key = `media/${fileName}`;
        const params = {
          Bucket: process.env.BUCKET_NAME_AWS,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        const upload = new Upload({
          client: this.s3,
          params,
        });

        const result = await upload.done();

        const foundedFolder = await this.prisma.folder.findUnique({
          where: {
            folder_name: folderName,
          },
        });

        const createdMedia = await this.prisma.media.create({
          data: {
            location: folderName,
            media_name: fileName,
            media_url: result.Location,
            type: file.mimetype,
            folder_id: foundedFolder.folder_id,
          },
        });

        return createdMedia;
      }),
    );

    return uploadedFiles;
  }

  async removeImage(image_name: string) {
    const params = {
      Bucket: process.env.BUCKET_NAME_AWS,
      Key: `media/${image_name}`,
    };

    await this.prisma.mediaCourseAssn.deleteMany({
      where: {
        media: {
          media_name: image_name,
        },
      },
    });

    await this.prisma.media.deleteMany({
      where: {
        media_name: image_name,
      },
    });
    // const foundedRelation = await this.

    await this.s3.send(new DeleteObjectCommand(params));

    return {
      message: 'image deleted succesfully',
    };
  }

  async createFolder(createFolderDto: CreateFolderDto): Promise<FolderDto> {
    const { folder_name } = createFolderDto;

    const foundedFolder = await this.prisma.folder.findFirst({
      where: {
        folder_name,
      },
    });

    if (foundedFolder) {
      throw new ConflictException('Folder already exists');
    }

    const newFolder = await this.prisma.folder.create({
      data: {
        folder_name,
      },
    });

    return newFolder;
  }

  async updateFolder(
    createFolderDto: CreateFolderDto,
    folder_id: string,
  ): Promise<FolderDto> {
    const { folder_name } = createFolderDto;

    const foundedFolder = await this.prisma.folder.findFirst({
      where: {
        folder_id,
      },
    });

    if (!foundedFolder) {
      throw new ConflictException('Folder not found');
    }

    const updatedFolder = await this.prisma.folder.update({
      where: {
        folder_id,
      },
      data: {
        folder_name,
      },
    });

    return updatedFolder;
  }

  async getAllFolders(): Promise<FolderDto[]> {
    return this.prisma.folder.findMany();
  }

  async findAll(query: FileQueryDto): Promise<FileDtoRt> {
    const {
      direction,
      page,
      rowsPerPage,
      sortBy,
      searchText,
      folder_name,
      file_type,
    } = query;

    const whereQuery: any = {};

    if (folder_name) {
      whereQuery.folder = {
        folder_name,
      };
    }

    if (searchText) {
      whereQuery.media_name = {
        contains: searchText,
      };
    }

    if (file_type && file_type === 'image') {
      whereQuery.type = {
        contains: 'image',
      };
    }

    if (file_type && file_type === 'file') {
      whereQuery.type = {
        not: {
          contains: 'image',
        },
      };
    }

    const allFiles = await this.prisma.media.findMany({
      where: whereQuery,
      take: Number(rowsPerPage),
      skip: Number(page) * Number(rowsPerPage),
      orderBy: {
        created_at: direction.toLowerCase() as 'asc' | 'desc',
      },
      include: {
        folder: true,
      },
    });

    const count = await this.prisma.media.count({
      where: whereQuery,
    });

    return {
      data: allFiles,
      count,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
