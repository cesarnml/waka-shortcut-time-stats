import { BaseUrl, RestResource } from '$lib/constants'
import { vi } from 'vitest'
import type { RequestEvent } from './$types'
import { GET } from './+server'
// TODO: Not a useful test, but think about how to test +server.ts files
describe('getSummaries', () => {
  it('should return summaries', async () => {
    const response = await fetch(`${BaseUrl.WakaTime}${RestResource.Summaries}`)
    expect(response.status).toBe(200)
    const json = await response.json()
    expect(json.data.length).toBeGreaterThan(0)
  })
})

describe('GET', () => {
  it('it...', async () => {
    const event = {
      url: {
        searchParams: {
          get: () => vi.fn(),
        },
      },
    } as unknown as RequestEvent
    const response = await GET(event)
    expect(response.status).toBe(200)
  })
})
