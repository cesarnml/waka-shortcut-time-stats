import { render, screen } from '@testing-library/svelte'
import Home from './+page.svelte'
import { durations, durationsByLanguage, summaries } from '$src/mocks/testData'
import { WakaApiRange } from '$lib/constants'

describe('Home', () => {
  it('it...', async () => {
    render(Home, { data: { summaries, durations, durationsByLanguage } })
    // Expect a select input with correct default value
    const selectInput = screen.getByRole('combobox')
    expect(selectInput).toBeInTheDocument()
    // Expect a StatPanelItem to be visible
    expect(screen.getByText(/total hours/i)).toBeVisible()
    // Expect a full panel StatPanelItem to be in the document
    expect(screen.getByText(/top project/i)).toBeInTheDocument()
    // Expect the top chart (Activity) to be visible
    expect(screen.getByText(/activity/i)).toBeVisible()
  })
})
