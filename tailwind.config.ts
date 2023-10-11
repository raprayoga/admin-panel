import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0060AE',
        red: '#f42619',
        gray: '#c6c0c0',
        'gray-shadow': '#d1d1d1',
        black: '#333130',
        green: '#52bd94',
        salmon: '#fff5f3',
        yellow: '#ffc107',
      },
      gridTemplateColumns: {
        'fill-12': 'repeat(auto-fill, minmax(12rem, 1fr))',
        'fill-16': 'repeat(auto-fill, minmax(16rem, 1fr))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
