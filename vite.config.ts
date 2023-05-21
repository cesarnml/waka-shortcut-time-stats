import { resolve } from 'node:path'
import { sveltekit } from '@sveltejs/kit/vite'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { defineConfig, loadEnv } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

const config = defineConfig(({ mode }) => {
  // Only setup Sentry in production
  const isProduction = mode === 'production'
  // Gain access to environmental variables within vite config
  const env = loadEnv(mode, process.cwd(), '')
  return {
    build: {
      target: 'esnext', // minimize transpilation
      sourcemap: true, // Tell vite to emit source maps
      minify: 'terser', // Minify the bundled code
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
    },
    plugins: [
      sveltekit(), // Add the sentry-vite-plugin last
      chunkSplitPlugin({ strategy: 'unbundle' }),
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
      environmentMatchGlobs: [
        // all tests in tests/dom will run in jsdom
        ['**/*.edge.spec.ts', 'edge-runtime'],
        ['**/*.node.spec.ts', 'node'],
        ['**/*.spec.ts', 'jsdom'],
        // ...
      ],
      environment: 'jsdom',
      setupFiles: ['setupTests.ts', 'src/mocks/setup.ts'],
      alias: {
        $lib: resolve(__dirname, 'src/lib'),
        $src: resolve(__dirname, 'src'),
      },
      deps: {
        inline: ['echarts', /msw/],
      },
      include: ['src/**/*.spec.{js,ts}'],
      coverage: {
        all: true,
        enabled: true,
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
