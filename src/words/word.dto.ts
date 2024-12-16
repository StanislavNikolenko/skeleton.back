import { User } from "src/users/user.schema";
import { ApiProperty } from "@nestjs/swagger";
import { Concept } from "src/concept/concept.schema";

export class CreateWordDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  concept: Concept;

  @ApiProperty()
  language: string;

  @ApiProperty()
  value: string;

  @ApiProperty()
  translation: string;
}

export class UpdateWordDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  concept: Concept;

  @ApiProperty()
  language: string;

  @ApiProperty()
  value: string;
}
