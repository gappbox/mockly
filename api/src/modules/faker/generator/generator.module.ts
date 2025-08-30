import { Module } from '@nestjs/common';
import { SchemaModule } from '../schema';
import { GeneratorController } from './generator.controller';
import { GeneratorService } from './generator.service';

@Module({
  imports: [
    SchemaModule,
  ],
  controllers: [
    GeneratorController,
  ],
  providers: [
    GeneratorService,
  ],
})
export class GeneratorModule {}