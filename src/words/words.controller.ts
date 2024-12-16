import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Headers
} from "@nestjs/common";
import { WordsService } from "./words.service";
import { Word } from "./word.schema";
import { CreateWordDto, UpdateWordDto } from "./word.dto";
import { ApiTags } from "@nestjs/swagger";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Public } from "src/decorators";
import { extractToken } from "src/services/token.service";

@ApiTags("words")
@Controller("words")
export class WordsController {
  constructor(private wordsService: WordsService) {}

  @Public()
  @ApiOperation({ summary: "Get all user words" })
  @ApiResponse({
    status: 200,
    description: "Get all user words",
    type: [Word],
  })
  @Get("user")
  async getAllUserWords(@Headers('Authorization') authHeader: string): Promise<Word[]> {
    const token = extractToken(authHeader);
    return this.wordsService.getAllWords(token);
  }

  @ApiOperation({ summary: "Get word by id" })
  @ApiResponse({
    status: 200,
    description: "Get word by id",
    type: Word,
  })
  @Get(":id")
  async getOneWord(@Param("id") id: string): Promise<Word> {
    console.log('get the word:', id);
    return await this.wordsService.getOneWord(id);
  }

  @Public()
  @ApiOperation({ summary: "Create a new word" })
  @ApiResponse({
    status: 201,
    description: "Create a new word",
    type: Word,
  })
  @Post()
  async create(@Body() createWordDto: CreateWordDto, @Headers('Authorization') authHeader: string): Promise<Word> {
    const token = extractToken(authHeader);
    return await this.wordsService.create(createWordDto, token);
  }

  @ApiOperation({ summary: "Update a word" })
  @ApiResponse({
    status: 200,
    description: "Update a word",
    type: Word,
  })
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateWordDto: UpdateWordDto,
  ): Promise<Word> {
    return await this.wordsService.update(id, updateWordDto);
  }

  @ApiOperation({ summary: "Delete a word" })
  @ApiResponse({
    status: 200,
    description: "Delete a word",
    type: Word,
  })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<Word> {
    return await this.wordsService.remove(id);
  }
}
