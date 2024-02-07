import { http } from "msw"

const handlers = [
  http.get("https://pokeapi.co/api/v2/pokemon/bulbasaur", (req, res, ctx) => {
    const mockApiResponse = [
      {
        id: 2,
        shopify_id: "sdfsdfs",
        description: "<p>Test</p>",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Wikiwiki2008.JPG/220px-Wikiwiki2008.JPG",
      },
    ]

    return res(ctx.json(mockApiResponse))
  }),
]

export { handlers }
