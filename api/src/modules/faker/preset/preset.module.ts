import { Module } from '@nestjs/common';
import { SchemaModule } from '../schema';
import { PresetController } from './preset.controller';
import { PresetFactory } from './preset.factory';
import { PresetService } from './preset.service';

@Module({
  imports: [
    SchemaModule,
  ],
  controllers: [
    PresetController,
  ],
  providers: [
    PresetService,
    PresetFactory,
  ],
})
export class PresetModule {}