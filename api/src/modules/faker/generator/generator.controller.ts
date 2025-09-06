import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GenerateParamsDto } from './dtos';
import { GeneratorService } from './generator.service';

@Controller('api/faker/generate')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  generate(@Body() body: GenerateParamsDto): Record<string, unknown>[] {
    return this.generatorService.generate(body);
  }
}
