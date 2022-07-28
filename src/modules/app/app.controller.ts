import { Controller, Get } from '@nestjs/common'

@Controller('/health-check')
export class AppController {
  @Get('/')
  healthCheck() {
    return Promise.resolve('Healthy')
  }
}
