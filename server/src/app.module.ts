import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { CountriesModule } from './countries/countries.module'
import { StatesModule } from './states/states.module'
import { CitiesModule } from './cities/cities.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
      })
    }),
    UsersModule,
    CountriesModule,
    StatesModule,
    CitiesModule
  ]
})
export class AppModule {}
