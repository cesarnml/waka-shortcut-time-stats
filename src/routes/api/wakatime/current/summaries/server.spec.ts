import { vi } from 'vitest'
import type { RequestEvent } from './$types'
import { GET } from './+server'

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
