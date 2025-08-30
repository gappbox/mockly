import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheMiddleware } from './middlewares/cache';
import { HeadersMiddleware } from './middlewares/headers';
import { MetadataMiddleware } from './middlewares/metadata';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HeadersMiddleware).forRoutes('*');
    consumer.apply(CacheMiddleware).forRoutes('*');
    consumer.apply(MetadataMiddleware).forRoutes('*');
  }
}
