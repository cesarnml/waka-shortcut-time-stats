import { sveltekit } from '@sveltejs/kit/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig, loadEnv } from 'vite'

const config = defineConfig(({ mode }) => {
  // Only setup Sentry in production
  const isProduction = mode === 'production'
  // Gain access to environmental variables within vite config
  const env = loadEnv(mode, process.cwd(), '')
  return {
    build: {
      sourcemap: true, // Tell vite to emit source maps
    },
    plugins: [
      sveltekit(), // Add the sentry-vite-plugin last
      isProduction
        ? sentryVitePlugin({
            telemetry: false, // Privacy :-)
            org: env.PUBLIC_SENTRY_ORG, // can be hardcode
            project: env.PUBLIC_SENTRY_PROJECT, // can be hardcode
            authToken: env.SENTRY_AUTH_TOKEN, // must be secret
            include: './svelte-kit/output', // default build output for source maps. Uploaded to Sentry on deploy
          })
        : '',
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.spec.{js,ts}'],
      setupFiles: 'setupTests.ts',
      coverage: {
        provider: 'istanbul',
        all: true,
        reporter: ['json', 'html', 'text'],
        src: ['./src'],
        include: ['src/**/*.{ts, svelte}', 'src/lib/components/**/*.svelte'],
        exclude: [
          'src/lib/external',
          'src/lib/typings',
          'src/routes/**/+page.svelte',
          'src/routes/**/+layout.svelte',
          'src/routes/**/+page*.ts',
          'src/routes/**/+layout*.ts',
          'src/routes/**/+error.svelte',
          'src/hooks.client.ts',
          'src/hooks.server.ts',
          'src/**/*.spec.{js,ts}',
          'src/lib/generated/**/*.ts',
        ],
      },
    },
  }
})

export default config
