import { App } from "./app";

const init = (): void => {
  const app = new App();
  app.initializeData();
  app.listen();
};

init();
