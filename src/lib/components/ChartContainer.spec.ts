import { render, screen } from '@testing-library/svelte'
import ChartContainer from './ChartContainer.svelte'

it('render a ChartContainer', async () => {
  render(ChartContainer)

  expect(screen.getByTestId('chart-container')).toBeInTheDocument()
})
