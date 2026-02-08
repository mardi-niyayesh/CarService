import * as UserDTO from "./dto";
import {Injectable} from '@nestjs/common';
import {BaseApiResponseType} from "../../lib";
import {UserRole} from "../prisma/generated/enums";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /** create user in db */
  async create(createData: UserDTO.CreateUserInput): Promise<BaseApiResponseType<{ user: UserDTO.CreateUserResponse }>> {
    const newUser = await this.prisma.user.create({
      data: {
        ...createData,
        role: UserRole.USER
      }
    });

    return {
      message: "user created successfully",
      data: {
        user: {
          ...newUser,
          password: undefined
        }
      }
    };
  }
}