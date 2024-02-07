import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithProviders } from "./test/test-utils";
import { server } from "./test/server";
import { errorHandlers } from "./test/server/handlers";
import { HttpResponse, http } from "msw";

describe("App", () => {
  it("Handles successfull response", async () => {
    renderWithProviders(<App />);

    screen.getByText("Loading...");

    await screen.findByText("Test");
  });

  it("Handles server error", async () => {
    server.use(...errorHandlers);
    renderWithProviders(<App />);

    screen.getByText("Loading...");

    await screen.findByText("Something went wrong");
  });

  it("Handles empty data", async () => {
    server.use(
      http.get(`${import.meta.env.VITE_BASE_URL}/products`, () => {
        console.log(123);
        return HttpResponse.json([]);
      }),
    );
    renderWithProviders(<App />);

    screen.getByText("Loading...");

    await screen.findByText("No products were found");
  });
});
