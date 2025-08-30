import { Controller } from '@nestjs/common';
import { PresetService } from './preset.service';

@Controller()
export class PresetController {
  public constructor(private readonly presetService: PresetService) {}
}