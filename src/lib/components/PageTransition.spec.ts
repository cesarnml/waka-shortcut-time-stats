import { render, screen } from '@testing-library/svelte'
import PageTransition from './PageTransition.svelte'

describe('PageTransition', () => {
  it('renders', async () => {
    render(PageTransition)
    expect(screen.getByTestId('page-transition')).toBeInTheDocument()
  })
})
