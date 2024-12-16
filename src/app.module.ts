import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { WordsModule } from "./words/words.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { ConceptModule } from "./concept/concept.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: "./config/.env", isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_URL"),
        dbName: configService.get<string>("MONGO_DB_NAME"),
      }),
    }),
    UsersModule,
    WordsModule,
    AuthModule,
    ConceptModule,
  ],
})
export class AppModule {}
