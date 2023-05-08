import watchMedia from 'svelte-media'

/**
 * **NOTE:**
 * `media` store *must* remain in sync with `screens` declared in `tailwind.config.cjs`
 */
const mediaQueries = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
} as const

export const media = watchMedia(mediaQueries)
