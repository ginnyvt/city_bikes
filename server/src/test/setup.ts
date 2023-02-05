import "reflect-metadata";
import container from "../config/container";

beforeEach(async () => {
  // create a snapshot so each unit test can modify
  // it without breaking other unit tests
  container.snapshot();
});

afterEach(() => {
  // Restore to last snapshot so each unit test
  // takes a clean copy of the application container
  container.restore();
});
