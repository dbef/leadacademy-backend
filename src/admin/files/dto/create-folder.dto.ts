import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateFolderDto {
  @ApiProperty({
    description: 'Folder name',
    type: String,
    required: true,
  })
  @IsString()
  folder_name: string;
}
