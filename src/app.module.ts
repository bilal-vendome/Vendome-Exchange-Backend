import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ComplaintModule } from './modules/complaint/complaint.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    EmailModule,
    ComplaintModule,
    // AuthModule,
    // UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
