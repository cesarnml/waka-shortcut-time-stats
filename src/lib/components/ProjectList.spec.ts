import { render, screen } from '@testing-library/svelte'
import ProjectList from './ProjectList.svelte'

it('renders a ProjectList', async () => {
  const projects = [
    { name: 'test', value: 4200 },
    { name: 'test2', value: 24 * 3600 + 7200 + 1800 },
  ]
  render(ProjectList, { props: { projects } })

  screen.debug()
})
