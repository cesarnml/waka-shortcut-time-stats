import { render, screen } from '@testing-library/svelte'
import ProjectList from './ProjectList.svelte'
import { formatHours, formatMinimalWork, formatMinutes } from '$lib/helpers/timeHelpers'
import { summaries } from 'src/mocks/testData'
import { Url } from '$lib/constants'
import { createProjectList } from './Stats/statHelpers'

it('renders a ProjectList', async () => {
  render(ProjectList, { summaries })

  const projects = createProjectList(summaries)

  projects.forEach((project) => {
    const link = screen.getByRole('link', { name: new RegExp(project.name), exact: true })

    expect(link).toHaveAttribute('href', Url.ProjectDetail(project.name))
    expect(link).toHaveTextContent(
      `${formatHours(project.value)} ${formatMinutes(project.value)} ${formatMinimalWork(
        project.value,
      )}`.trim(),
    )
  })
})
