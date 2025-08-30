import { Controller } from '@nestjs/common';
import { SchemaService } from './schema.service';

@Controller()
export class SchemaController {
  public constructor(private readonly schemaService: SchemaService) {}
}