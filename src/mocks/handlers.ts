// src/mocks/handlers.ts
import { ApiEndpoint, BaseUrl, RestResource } from '$lib/constants'
import { rest } from 'msw'
import { durations, summaries } from './testData'

// Define handlers that catch the corresponding requests and return the mock data.
export const handlers = [
  rest.get(ApiEndpoint.Summaries, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(summaries))
  }),
  rest.get(ApiEndpoint.Durations, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(durations))
  }),
  rest.get(`${BaseUrl.WakaTime}${RestResource.Summaries}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(summaries))
  }),
]
