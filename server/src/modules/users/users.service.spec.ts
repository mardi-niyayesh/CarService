import {Test} from "@nestjs/testing";
import {UsersService} from "./users.service";
import {NotFoundException} from "@nestjs/common";
import {DeepMockProxy} from "vitest-mock-extended";
import {PrismaService} from "../prisma/prisma.service";
import {it, vi, expect, describe, afterEach, beforeEach} from "vitest";

describe("UsersService", (): void => {

});