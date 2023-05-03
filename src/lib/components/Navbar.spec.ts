import { render, screen } from '@testing-library/svelte'
import Navbar from './Navbar.svelte'

it('renders a navbar', async () => {
  render(Navbar)

  const navbar = screen.getByRole('navigation')
  expect(navbar).toBeInTheDocument()

  const logo = screen.getByRole('link', { name: /stats/i })
  expect(logo).toBeInTheDocument()
})