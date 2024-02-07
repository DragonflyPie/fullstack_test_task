import { App } from "./app";

const init = async (): Promise<void> => {
  const app = new App();
  await app.initializeData();
  app.listen();
};

init().then(() => {
  console.info("Server started");
});
