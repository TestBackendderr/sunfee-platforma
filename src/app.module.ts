import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UmowaModule } from './umowa/umowa.module';

@Module({
  imports: [UserModule, AuthModule, UmowaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
