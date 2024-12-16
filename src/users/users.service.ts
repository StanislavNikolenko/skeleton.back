import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { NotFoundException, BadRequestException } from "@nestjs/common";
import { User } from "./user.schema";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {}

  async create(createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const isUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (isUser) {
      throw new BadRequestException("User with this email already exists!");
    }
    const user = new this.userModel(createUserDto);
    user.save();
    const payload = { sub: user._id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getOneUser(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async getUserByEmail(userEmail: string): Promise<User> {
    return this.userModel.findOne({ email: userEmail }).exec();
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    if (!users || users.length == 0) {
      throw new NotFoundException("Users data not found!");
    }
    return users;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id: userId }, updateUserDto);
  }

  async remove(userId: string): Promise<User> {
    return this.userModel.findOneAndDelete({ _id: userId });
  }
}
