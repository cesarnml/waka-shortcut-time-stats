import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import SearchInput from './SearchInput.svelte'
import { vi } from 'vitest'
import { projects } from '$src/mocks/testData'
import { ApiEndpoint } from '$lib/constants'

describe('SearchInput', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(() => {
      return Promise.resolve({
        json() {
          return Promise.resolve(projects)
        },
      })
    })
  })

  it('renders', async () => {
    render(SearchInput)

    const searchInput = screen.getByRole('textbox')
    expect(searchInput).toHaveAttribute('placeholder', 'Search')

    expect(global.fetch).not.toHaveBeenCalled()

    let loadingIndicator = screen.queryByRole('button')
    expect(loadingIndicator).toBeNull()

    await user.type(searchInput, 'Cesar')

    loadingIndicator = await screen.findByRole('button')
    expect(loadingIndicator).toBeInTheDocument()

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(`${ApiEndpoint.Projects}?q=Cesar`)
    expect(searchInput).toHaveValue('Cesar')
  })
})
