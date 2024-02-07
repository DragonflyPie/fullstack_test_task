import { http, HttpResponse } from "msw";

const handlers = [
  http.get(`${import.meta.env.VITE_BASE_URL}/products`, () => {
    const mockApiResponse = [
      {
        id: 2,
        shopify_id: "sdfsdfs",
        description: "<p>Test</p>",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Wikiwiki2008.JPG/220px-Wikiwiki2008.JPG",
      },
    ];

    return HttpResponse.json(mockApiResponse);
  }),
];

const errorHandlers = [
  http.get(`${import.meta.env.VITE_BASE_URL}/products`, () => {
    return HttpResponse.error();
  }),
];

export { handlers, errorHandlers };
