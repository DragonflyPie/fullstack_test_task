import "@testing-library/jest-dom"

import { server } from "./test/server"

// @ts-ignore
globalThis.fetch = fetch
// @ts-ignore
globalThis.Headers = Headers
// @ts-ignore
globalThis.Request = Request
// @ts-ignore
globalThis.Response = Response

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
