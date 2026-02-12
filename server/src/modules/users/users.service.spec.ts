import {Test} from "@nestjs/testing";
import type {SafeUser} from "@/types";
import {UsersService} from "./users.service";
import {NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {User} from "@/modules/prisma/generated/client";
import {UserRole} from "@/modules/prisma/generated/enums";
import {type DeepMockProxy, mockDeep, mockReset} from "vitest-mock-extended";
import {it, vi, expect, describe, afterEach, beforeEach} from "vitest";

type PrismaMock = DeepMockProxy<PrismaService>;

describe("UsersService", (): void => {
  let service: UsersService;
  let prisma: PrismaMock;

  beforeEach(async (): Promise<void> => {
    prisma = mockDeep<PrismaMock>();

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {provide: PrismaService, useValue: prisma},
      ],
    }).compile();

    service = module.get(UsersService);
  });

  afterEach((): void => {
    mockReset(prisma);
  });

  it('should find user and don`t send password ', async (): Promise<void> => {
    const fakeUser = {
      id: "2a55bda6-e1fc-4047-9725-aeec8fcc9ec4",
      age: 20,
      email: "user@example.com",
      role: UserRole.USER,
      display_name: "first user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prisma.user.findFirst.mockResolvedValue(fakeUser as User);

    const result = await service.findOne(fakeUser.id);

    expect(result.data.user.password).toBeUndefined();
    expect(result.data.user.email).toBe(fakeUser.email);
    expect(result.message).toBe("User found successfully");
  });

  it('if user not exist should to exception', async (): Promise<void> => {
    prisma.user.findFirst.mockResolvedValue(null);

    const result = await service.findOne("2a55bda6-e1fc-4047-9725-aeec8fcc9ec3");

    await expect(result).rejects.toThrow(NotFoundException);
  });
});