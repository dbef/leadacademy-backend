import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LinkDto {
  @ApiProperty({ example: 'https://...' })
  @IsString()
  href: string;
}

class LinksDto {
  @ApiProperty({ type: LinkDto })
  @ValidateNested()
  @Type(() => LinkDto)
  details: LinkDto;

  @ApiProperty({ type: LinkDto })
  @ValidateNested()
  @Type(() => LinkDto)
  redirect: LinkDto;
}

export class PaymentCallbackResponseDto {
  @ApiProperty({ example: '0666d7a2-35fb-48e8-b10e-171b4efe0fd3' })
  @IsString()
  id: string;

  @ApiProperty({ type: LinksDto })
  @ValidateNested()
  @Type(() => LinksDto)
  _links: LinksDto;
}
