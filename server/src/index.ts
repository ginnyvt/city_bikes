import "reflect-metadata";

/* local imports */
import { startApolloServer } from "./frameworks/apollo";

const checkEnvs = () => {
  if (process.env.DATABASE_URL === undefined) {
    throw new Error("Missing DATABASE_URL env.");
  }
};

(async () => {
  checkEnvs();
  startApolloServer();
})();
