import { sveltekit } from '@sveltejs/kit/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig, loadEnv } from 'vite'
import Inspect from 'vite-plugin-inspect'

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
      Inspect({
        build: true,
        outputDir: '.vite-inspect',
      }),
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
    define: {
      // Eliminate in-source test code
      'import.meta.vitest': 'undefined',
    },
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.spec.{js,ts}'],
      setupFiles: ['setupTests.ts', 'src/mocks/setup.ts'],
      deps: {
        inline: ['echarts', /msw/],
      },
      coverage: {
        all: true,
        provider: 'c8',
        reporter: ['json', 'html', 'text', 'lcov'],
        src: ['./src'],
        skipFull: true,
        include: ['src/**/*.{ts, svelte}', 'src/lib/components/**/*.svelte'],
        exclude: [
          'src/lib/external',
          'src/lib/typings',
          'src/routes/**/+page*.ts',
          'src/routes/**/+layout*.ts',
          'src/routes/**/+error.svelte',
          'src/hooks.client.ts',
          'src/hooks.server.ts',
          'src/**/*.spec.{js,ts}',
          'src/lib/generated/**/*.ts',
          'src/lib/constants.ts',
          'src/mocks',
          'src/**/*.d.ts',
        ],
      },
    },
  }
})

export default config
