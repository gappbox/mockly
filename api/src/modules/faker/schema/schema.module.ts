import { Module } from '@nestjs/common';
import { SchemaController } from './schema.controller';
import { SchemaService } from './schema.service';
import { CategoryValidator } from './validators/category';
import { TypeValidator } from './validators/type';

@Module({
  controllers: [
    SchemaController,
  ],
  providers: [
    SchemaService,
    CategoryValidator,
    TypeValidator,
  ],
  exports: [
    SchemaService,
  ],
})
export class SchemaModule {}