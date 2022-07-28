import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { AppController } from '@modules/app/app.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from '../../config/configuration'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModule } from '@modules/user/user.module'
import { AuthModule } from '@modules/auth/auth.module'
import { AuthMiddleware } from 'src/middleware/auth.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('database')
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/users*', method: RequestMethod.ALL });
  }
}
