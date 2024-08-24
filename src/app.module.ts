import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './modules/common/common-module';
import { LocationModule } from './modules/locations/location.module';

@Module({
  imports: [CommonModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
