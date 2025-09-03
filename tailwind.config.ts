import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssAnimate],
};

export default config;
