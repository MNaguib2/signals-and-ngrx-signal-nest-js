import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RouterModule } from '@nestjs/core';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [
    UsersModule,
    GlobalModule,
    RouterModule.register([
      {
        path: 'api',
        children: [
          { path: 'user', module: UsersModule },
          { path: '404', module: GlobalModule },
        ],
      },
    ]),
  ],
})
export class Modules {}
