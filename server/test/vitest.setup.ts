import 'reflect-metadata';

vi.mock("@/common/swagger", () => {
  // noinspection JSUnusedGlobalSymbols
  return {
    setupSwagger: () => {},
  };
});