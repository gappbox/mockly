import { Module } from '@nestjs/common';
import { SchemaController } from './schema.controller';
import { SchemaService } from './schema.service';

@Module({
  controllers: [
    SchemaController,
  ],
  providers: [
    SchemaService,
  ],
  exports: [
    SchemaService,
  ],
})
export class SchemaModule {}