import { render, screen } from '@testing-library/svelte'
import LanguagePieChart from './LanguagePieChart.svelte'
import type { SummariesResult } from '$src/routes/api/wakatime/current/summaries/+server'

it('renders a LanguagePieChart', async () => {
  const summaries = {
    data: [
      {
        languages: [
          { name: 'JavaScript', total_seconds: 3600 },
          { name: 'Python', total_seconds: 1800 },
        ],
      },
      {
        languages: [
          { name: 'JavaScript', total_seconds: 7200 },
          { name: 'TypeScript', total_seconds: 5400 },
        ],
      },
    ],
  } as SummariesResult
  render(LanguagePieChart, { props: { summaries } })
  expect(screen.getByTestId('chart')).toBeInTheDocument()
})
