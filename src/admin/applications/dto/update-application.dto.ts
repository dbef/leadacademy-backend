import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class UpdateApplicationDtoAdmin {
  @IsString()
  @IsIn(['approved', 'rejected', 'pending-payment'])
  @ApiProperty({ type: String })
  status: string;
}
