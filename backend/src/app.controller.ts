import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './security/security.jwt.guard';

@ApiTags('Principal')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/validateToken')
  validateToken() {
    return HttpStatus.OK;
  }
}
