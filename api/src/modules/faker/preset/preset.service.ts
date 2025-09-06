import { Injectable } from '@nestjs/common';
import { PresetFactory } from './preset.factory';

@Injectable()
export class PresetService {
  constructor(private readonly presetFactory: PresetFactory) {}
}