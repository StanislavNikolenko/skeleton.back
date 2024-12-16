import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { UsersService } from "./users.service";
import { User } from "./user.schema";
import { Public } from "src/decorators";
import {
  ApiCreatedResponse,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "Get all users",
    type: [User],
  })
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Get user by id" })
  @ApiResponse({
    status: 200,
    description: "Get user by id",
    type: User,
  })
  @Get(":id")
  async getOneUser(@Param("id") id: string): Promise<User> {
    return await this.usersService.getOneUser(id);
  }

  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({
    status: 201,
    description: "Create a new user",
    type: User,
  })
  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<{ access_token: string }>{
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Update a user" })
  @ApiResponse({
    status: 200,
    description: "Update a user",
    type: User,
  })
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({
    status: 200,
    description: "Delete a user",
    type: User,
  })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<User> {
    return await this.usersService.remove(id);
  }
}
