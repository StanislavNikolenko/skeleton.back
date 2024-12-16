import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Headers,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Public } from "src/decorators";
import { ConceptService } from "./concept.service";
import { Concept } from "./concept.schema";
import { extractToken } from "src/services/token.service";

@ApiTags("concepts")
@Controller("concepts")
export class ConceptController {
  constructor(private conceptService: ConceptService) {}

  @Public()
  @ApiOperation({ summary: "Get all user concepts" })
  @ApiResponse({
    status: 200,
    description: "Get all user concepts",
    type: [Concept],
  })
  @Get("users")
  async getAllConcepts(@Headers('Authorization') authHeader: string): Promise<Concept[]> {
    const token = extractToken(authHeader);
    return await this.conceptService.getAllConcepts(token);
  }

  @Public()
  @Get(":name")
  async getConceptWords(@Param("name") name: string): Promise<any> {
    return await this.conceptService.getConceptWords(name);
  }

  @Public()
  @ApiOperation({ summary: "Delete a concept" })
  @ApiResponse({
    status: 200,
    description: "Delete a concept",
    type: Concept,
  })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Concept> {
    return await this.conceptService.remove(id);
  }
}
