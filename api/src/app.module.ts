import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheMiddleware } from './middlewares/cache';
import { HeadersMiddleware } from './middlewares/headers';
import { MetadataMiddleware } from './middlewares/metadata';
import { FakerModule } from './modules/faker';

@Module({
  imports: [
    FakerModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HeadersMiddleware).forRoutes('*');
    consumer.apply(CacheMiddleware).forRoutes('*');
    consumer.apply(MetadataMiddleware).forRoutes('*');
  }
}
