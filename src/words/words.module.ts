import { Module } from "@nestjs/common";
import { Word, WordSchema } from "./word.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { WordsController } from "./words.controller";
import { WordsService } from "./words.service";
import { Concept, ConceptSchema } from "src/concept/concept.schema";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Word.name, schema: WordSchema },
      { name: Concept.name, schema: ConceptSchema },
    ]),
    AuthModule
  ],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
