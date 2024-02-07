import { http } from "msw"
import { screen } from "@testing-library/react"

import App from "./App"
import { server } from "./test/server"
import { renderWithProviders } from "./test/test-utils"

describe("App", () => {
  it("handles good response", async () => {
    renderWithProviders(<App />)

    screen.getByText("Loading...")

    await screen.findByText("Test")
  })

  // it("handles error response", async () => {
  //   // force msw to return error response
  //   server.use(
  //     http.get(
  //       "https://pokeapi.co/api/v2/pokemon/bulbasaur",
  //       (req, res, ctx) => {
  //         return res(ctx.status(500))
  //       },
  //     ),
  //   )

  //   renderWithProviders(<App />)

  //   screen.getByText("Loading...")

  //   await screen.findByText("Oh no, there was an error")
  // })
})
