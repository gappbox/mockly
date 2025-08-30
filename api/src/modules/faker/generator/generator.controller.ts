import { Controller } from '@nestjs/common';
import { GeneratorService } from './generator.service';

@Controller()
export class GeneratorController {
  public constructor(private readonly generatorService: GeneratorService) {}
}