import { expect, test } from '@playwright/test'

test('index page has a logo button', async ({ page }) => {
  await page.goto('/')
  const logo = page.getByRole('button', { name: 'logo', exact: true })
  const projects = page.getByRole('button', { name: /projects/i })
  const iterations = page.getByRole('button', { name: /iterations/i })

  await expect(logo).toBeVisible()
  await projects.click()
  await expect(page).toHaveURL(/projects/)
  await iterations.click()
  await expect(page).toHaveURL(/iterations/)
  await logo.click()
  await expect(page).toHaveURL('/')
})
