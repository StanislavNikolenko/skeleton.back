import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    console.log('signIn service');
    const user = await this.usersService.getUserByEmail(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}
