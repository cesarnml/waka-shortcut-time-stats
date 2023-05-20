/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        'chart-dark': '#0F0C28',
      },
      aspectRatio: {
        panoramic: '3/1',
        chart: '2/1',
        photo: '3/2',
        tv: '4/3',
        portrait: '4/5',
        tiktok: '9/16',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['synthwave', 'night'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'night',
  },
}
