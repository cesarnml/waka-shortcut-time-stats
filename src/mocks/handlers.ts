// src/mocks/handlers.ts
import { ApiEndpoint, BaseUrl, RestResource } from '$lib/constants'
import { rest } from 'msw'
import { durations, iterationStories, iterations, projects, summaries } from './testData'

export const TEST_ITERATION_ID = 15

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
  rest.get(`${BaseUrl.WakaTime}${RestResource.Durations}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(durations))
  }),
  rest.get(`${BaseUrl.WakaTime}${RestResource.Projects}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(projects))
  }),
  rest.get(`${BaseUrl.Shortcut}${RestResource.Iterations}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(iterations))
  }),
  rest.get(
    `${BaseUrl.Shortcut}${RestResource.IterationStories(TEST_ITERATION_ID)}`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(iterationStories))
    },
  ),
]
