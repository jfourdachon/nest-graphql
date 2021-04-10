import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  providers: [UserService],  //TODO add userResolver after migrating to mongo
  exports: [UserService]
})
export class UserModule {}
