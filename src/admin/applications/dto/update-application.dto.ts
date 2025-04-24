import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class UpdateApplicationDtoAdmin {
  @IsString()
  @IsIn(['approved', 'rejected', 'paid', 'pending'])
  @ApiProperty({ type: String })
  status: string;
}
