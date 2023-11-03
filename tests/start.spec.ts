import { rest, test } from './mocks/global.mocks'
import { ListProjects } from '@/types/listProjects.types'
import { mockListProjects } from './mocks/listProjects.mocks'

test.use({
  mswHandlers: [
    // set the cookie request
    rest.post('/start', (req, res, ctx) => {
      return res(ctx.status(200))
    }),
    rest.get(
      'https://app.launchdarkly.com/api/v2/projects',
      (req, res, ctx) => {
        return res(ctx.status(200), ctx.json<ListProjects>(mockListProjects))
      },
    ),
  ],
})

test.describe('start page', () => {
  test('should redirect the user with a valid token', async ({
    page,
    context,
  }) => {
    await page.goto('http://localhost:3000')
    await page.getByPlaceholder('LaunchDarkly Access Token').type('1234567890')
    await page.getByRole('button', { name: 'Submit' }).click()
    await page.waitForURL('http://localhost:3000')
  })
})