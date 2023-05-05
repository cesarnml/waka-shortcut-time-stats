import { render, screen } from '@testing-library/svelte'
import ProjectList from './ProjectList.svelte'
import { formatHours, formatMinimalWork, formatMinutes } from '$lib/helpers/timeHelpers'

it('renders a ProjectList', async () => {
  const projects = [
    { name: 'project1', value: 42 * 60 }, // 42m
    { name: 'project2', value: 3 * 60 * 60 }, // 3h
    { name: 'project3', value: 28 * 60 * 60 }, // 28h
    { name: 'project4', value: 28 * 60 * 60 + 42 * 60 }, // 28h + 42m
    { name: 'project5', value: 30 }, // 30s => Less than 1 minute
  ]
  render(ProjectList, { projects })

  projects.forEach((project) => {
    const link = screen.getByRole('link', { name: new RegExp(project.name, 'i') })

    expect(link).toHaveAttribute('href', `/projects/${project.name}`)
    expect(link).toHaveTextContent(
      `${formatHours(project.value)} ${formatMinutes(project.value)} ${formatMinimalWork(
        project.value,
      )}`.trim(),
    )
  })
})
