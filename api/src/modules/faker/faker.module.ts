import { Module } from '@nestjs/common';
import { GeneratorModule } from './generator';
import { PresetModule } from './preset';
import { SchemaModule } from './schema';

@Module({
  imports: [
    GeneratorModule,
    PresetModule,
    SchemaModule,
  ],
})
export class FakerModule {}