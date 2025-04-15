import {
  IsString,
  IsOptional,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class ClientDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  brand_ka: string;

  @ApiProperty()
  @IsString()
  brand_en: string;

  @ApiProperty()
  @IsString()
  url: string;
}

class OrderStatusDto {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  value: string;
}

class RedirectLinksDto {
  @ApiProperty()
  @IsString()
  success: string;

  @ApiProperty()
  @IsString()
  fail: string;
}

class TransferMethodDto {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  value: string;
}

class PaymentDetailDto {
  @ApiProperty({ type: TransferMethodDto })
  @ValidateNested()
  @Type(() => TransferMethodDto)
  transfer_method: TransferMethodDto;

  @ApiProperty()
  @IsString()
  transaction_id: string;

  @ApiProperty()
  @IsString()
  payer_identifier: string;

  @ApiProperty()
  @IsString()
  payment_option: string;

  @ApiProperty()
  @IsString()
  card_type: string;

  @ApiProperty()
  @IsString()
  card_expiry_date: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  request_account_tag: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  transfer_account_tag: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  saved_card_type: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  parent_order_id: string | null;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  code_description: string;

  @ApiProperty()
  @IsString()
  pg_trx_id: string;
}

class PurchaseItemDto {
  @ApiProperty()
  @IsString()
  external_item_id: string;

  @ApiProperty()
  @IsString()
  unit_price: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  quantity: string;

  @ApiProperty()
  @IsString()
  unit_discount_price: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  package_code: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  total_price: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  vat: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  vat_percent: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tin: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pinfl: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  product_discount_id: string | null;
}

class PurchaseUnitsDto {
  @ApiProperty()
  @IsString()
  request_amount: string;

  @ApiProperty()
  @IsString()
  transfer_amount: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  refund_amount: string | null;

  @ApiProperty()
  @IsString()
  currency_code: string;

  @ApiProperty({ type: [PurchaseItemDto] })
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  items: PurchaseItemDto[];
}

export class OrderDto {
  @ApiProperty()
  @IsString()
  order_id: string;

  @ApiProperty()
  @IsString()
  external_order_id: string;

  @ApiProperty({ type: ClientDto })
  @ValidateNested()
  @Type(() => ClientDto)
  client: ClientDto;

  @ApiProperty()
  @IsDateString()
  create_date: string;

  @ApiProperty()
  @IsDateString()
  zoned_create_date: string;

  @ApiProperty()
  @IsDateString()
  expire_date: string;

  @ApiProperty()
  @IsDateString()
  zoned_expire_date: string;

  @ApiProperty({ type: OrderStatusDto })
  @ValidateNested()
  @Type(() => OrderStatusDto)
  order_status: OrderStatusDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  buyer: string | null;

  @ApiProperty({ type: RedirectLinksDto })
  @ValidateNested()
  @Type(() => RedirectLinksDto)
  redirect_links: RedirectLinksDto;

  @ApiProperty({ type: PaymentDetailDto })
  @ValidateNested()
  @Type(() => PaymentDetailDto)
  payment_detail: PaymentDetailDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  actions: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  disputes: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  split: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  discount: string | null;

  @ApiProperty()
  @IsString()
  lang: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reject_reason: string | null;

  @ApiProperty()
  @IsString()
  industry: string;

  @ApiProperty()
  @IsString()
  capture: string;

  @ApiProperty({ type: PurchaseUnitsDto })
  @ValidateNested()
  @Type(() => PurchaseUnitsDto)
  purchase_units: PurchaseUnitsDto;
}
