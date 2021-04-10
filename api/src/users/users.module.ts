import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],  //TODO add userResolver after migrating to mongo
  exports: [UsersService]
})
export class UsersModule {}
