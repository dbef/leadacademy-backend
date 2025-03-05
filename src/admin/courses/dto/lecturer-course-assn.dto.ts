import { ApiProperty } from '@nestjs/swagger';
import { LecturerDto } from '../../lecturer/dto/lecturer.dto';

export class LecturerCourseAssnDto {
  @ApiProperty({
    type: LecturerDto,
  })
  lecturer: LecturerDto;
}
