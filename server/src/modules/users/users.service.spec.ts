import {UsersService} from "./users.service";
import {NotFoundException} from "@nestjs/common";
import {User} from "@/modules/prisma/generated/client";
import {PrismaService} from "@/modules/prisma/prisma.service";
import {it, expect, describe, afterEach, beforeEach} from "vitest";
import {type DeepMockProxy, mockDeep, mockReset} from "vitest-mock-extended";

const date = new Date();

type PrismaMock = DeepMockProxy<PrismaService>;

describe("UsersService", (): void => {
  let service: UsersService;
  let prisma: PrismaMock;

  beforeEach((): void => {
    prisma = mockDeep<PrismaService>();
    service = new UsersService(prisma);
  });

  it('should find user and don`t send password: ', async (): Promise<void> => {
    const fakeUser = {
      id: "2a55bda6-e1fc-4047-9725-aeec8fcc9ec4",
      createdAt: date,
      updatedAt: date,
      email: "user@example.com",
      password: "example_password",
      display_name: "first user",
      age: 20,
      userRoles: [
        {
          role: {
            name: "self",
            rolePermissions: [
              {
                permission: [
                  {name: "user.self"},
                ]
              }
            ]
          }
        }
      ]
    } as unknown as User;

    prisma.user.findUnique.mockResolvedValue(fakeUser);

    const result = await service.findOne(fakeUser.id);

    expect((result.data.user as unknown as User).password).toBeUndefined();
    expect(result.data.user.email).toBe(fakeUser.email);
    expect(result.message).toBe("User found successfully");
  });

  it('if user not exist should to exception: ', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    // noinspection ES6RedundantAwait
    await expect(
      service.findOne("2a55bda6-e1fc-4047-9725-aeec8fcc9ec3")
    ).rejects.toThrow(NotFoundException);
  });

  /** reset all */
  afterEach((): void => {
    mockReset(prisma);
  });
});