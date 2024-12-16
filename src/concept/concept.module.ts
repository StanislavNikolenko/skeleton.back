import { Module } from "@nestjs/common";
import { Concept, ConceptSchema } from "./concept.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { ConceptController } from "./concept.controller";
import { ConceptService } from "./concept.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Concept.name, schema: ConceptSchema }]),
    AuthModule
  ],
  controllers: [ConceptController],
  providers: [ConceptService],
})
export class ConceptModule {}
