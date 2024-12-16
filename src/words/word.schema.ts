import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { User } from "src/users/user.schema";
import mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Concept } from "src/concept/concept.schema";

export type WordDocument = HydratedDocument<Word>;

@Schema()
export class Word {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;

  @ApiProperty()
  @Prop()
  language: string;

  @ApiProperty()
  @Prop()
  value: string;

  @ApiProperty()
  @Prop()
  translation: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Concept" })
  concept: Concept;
}

export const WordSchema = SchemaFactory.createForClass(Word);
