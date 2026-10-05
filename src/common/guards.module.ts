import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [AuthModule], // <-- Imports AuthModule instead of raw PassportModule registration
  providers: [JwtAuthGuard, RolesGuard],
  exports: [JwtAuthGuard, RolesGuard],
})
export class CommonModule {}