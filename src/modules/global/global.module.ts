import { Module } from '@nestjs/common';
import { NotFoundRouteController } from './not-found-route/not-found-route.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Counter, CounterSchema } from './schema/Counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),
  ],
  providers: [],
  exports: [],
  controllers: [NotFoundRouteController],
})
export class GlobalModule {}
