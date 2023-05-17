import { vi } from 'vitest'
import type { RequestEvent } from './$types'
import { GET } from './+server'
import { durations } from '$src/mocks/testData'

describe('/api/wakatime/current/durations', () => {
  it('works', async () => {
    const event = {
      url: {
        searchParams: {
          get: vi.fn(),
        },
      },
    }
    const response = await GET(event as unknown as RequestEvent)
    const result = await response.json()

    expect(event.url.searchParams.get).toBeCalledTimes(2)
    expect(response.status).toBe(200)
    expect(result).toEqual(durations)

    // How to test error case? Failed approach below, but questionable value since we don't do anything with error.
    // const errorEvent = {
    //   url: {
    //     searchParams: {
    //       get: () => {
    //         throw new Error('boom')
    //       },
    //     },
    //   },
    // }
    // const errorResponse = await GET(errorEvent as unknown as RequestEvent)
    // expect(response).toThrowError()
  })
})
