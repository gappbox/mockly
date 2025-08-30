import { Injectable } from '@nestjs/common';
import { PresetFactory } from './preset.factory';

@Injectable()
export class PresetService {
  public constructor(private readonly presetFactory: PresetFactory) {}
}