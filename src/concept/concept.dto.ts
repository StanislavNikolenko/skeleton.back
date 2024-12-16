import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/user.schema";

export class CreateConceptDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  user: User;
}

export class UpdateConseptDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  user: User;
}
