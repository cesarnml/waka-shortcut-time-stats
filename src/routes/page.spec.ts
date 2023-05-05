import { render, screen } from '@testing-library/svelte'
import HomePage from './+page.svelte'
import { durations, durationsByLanguage, summaries } from '../mocks/handlers'
import userEvent from '@testing-library/user-event'
import { WakaApiRange } from '$lib/constants'

it('renders a HomePage', async () => {
  const user = userEvent.setup()
  const props = { data: { summaries, durations, durationsByLanguage } }
  // @ts-expect-error tough type
  render(HomePage, props)
  const select = screen.getByRole('combobox')
  expect(select).toHaveValue(WakaApiRange.Last_7_Days_From_Yesterday)
  await user.selectOptions(select, WakaApiRange.Last_14_Days)
  expect(select).toHaveValue(WakaApiRange.Last_14_Days)
})
