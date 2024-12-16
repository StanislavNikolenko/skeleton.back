import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";
import { Word } from "src/words/word.schema";
import { User } from "src/users/user.schema";

export type ConceptDocument = HydratedDocument<Concept>;

@Schema()
export class Concept {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;

  @ApiProperty()
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Word" }])
  words: Word[];
}

export const ConceptSchema = SchemaFactory.createForClass(Concept);
