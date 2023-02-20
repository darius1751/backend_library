import { PartialType } from '@nestjs/mapped-types';
import { CreateRenewalDto } from './create-renewal.dto';

export class UpdateRenewalDto extends PartialType(CreateRenewalDto) {}
