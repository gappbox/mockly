import { Module } from '@nestjs/common';
import { SchemaController } from './schema.controller';
import { SchemaService } from './schema.service';
import { CategoryValidator } from './validators/category';

@Module({
  controllers: [
    SchemaController,
  ],
  providers: [
    SchemaService,
    CategoryValidator,
  ],
  exports: [
    SchemaService,
  ],
})
export class SchemaModule {}