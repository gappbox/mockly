import { fakerEN_US as faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { GenerateParamsDto } from './dtos';

@Injectable()
export class GeneratorService {
  generate(body: GenerateParamsDto): Record<string, unknown>[] {
    return faker.helpers.multiple(this.#createObject(body.fields), { count: body.count });
  }

  #createObject(fields: GenerateParamsDto['fields']): () => Record<string, unknown> {
    return () => {
      return fields.reduce((acc, { field, category, type, settings }) => {
        if (faker[category] && typeof faker[category][type] === 'function') {
          const result = faker[category][type](settings?.options ?? {});

          acc[field] = settings && settings.extract
            ? result[settings.extract]
            : result;
        }

        return acc;
      }, {});
    };
  }
}
