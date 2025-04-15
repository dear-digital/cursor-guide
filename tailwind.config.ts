import type {Config} from 'tailwindcss';

import typographyPlugin from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';
import tailwindAnimatePlugin from 'tailwindcss-animate';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    typographyPlugin,
    tailwindAnimatePlugin,
    plugin(({addComponents, addVariant}) => {
      addComponents({
        '.section-padding': {
          '@screen sm': {
            paddingBottom: 'var(--paddingBottom)',
            paddingTop: 'var(--paddingTop)',
          },
          paddingBottom: 'calc(var(--paddingBottom) * .75)',
          paddingTop: 'calc(var(--paddingTop) * .75)',
        },
      });
      // Target touch and non-touch devices
      addVariant('touch', '@media (pointer: coarse)');
      addVariant('notouch', '@media (hover: hover)');
    }),
  ],
  safelist: [
    'py-6',
    'lg:py-5',
    'lg:py-6',
    'lg:py-8',
    'lg:py-10',
    'pb-6',
    'lg:pb-8',
    'mt-8',
    'lg:mt-10',
    'mb-4',
  ],
  theme: {
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      aspectRatio: {
        '1/1': '1 / 1',
        '3/2': '3 / 2',
        '4/3': '4 / 3',
        '11/18': '11 / 18',
        '16/9': '16 / 9',
        '21/9': '21 / 9',
      },
      borderRadius: {
        base: '4px',
        button: '40px',
        full: '9999px',
        lg: '16px',
        none: '0',
        xl: '24px',
      },
      brightness: {
        50: '.5',
        60: '.6',
      },
      colors: {
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          foreground: 'rgb(var(--accent-foreground) / <alpha-value>)',
        },
        background: 'rgb(var(--background) / <alpha-value>)',
        blue: '#AFDCF1',
        boldFourth: '#3F4447',
        border: 'rgb(var(--border) / <alpha-value>)',
        card: {
          background: '#F3F5F3',
          DEFAULT: 'rgb(var(--card) / <alpha-value>)',
          foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
        },
        contentPrimary: '#23282A',
        dark: '#101010',
        destructive: {
          DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
          foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)',
        },
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        gray: {
          background: "#F3F5F3",
          foreground: "#65686B",
        },
        green: '#42BABA',
        input: 'rgb(var(--input) / <alpha-value>)',
        light: '#FFFFFF',
        muted: {
          DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
        },
        navBlue: '#5674B4',
        popover: {
          DEFAULT: 'rgb(var(--popover) / <alpha-value>)',
          foreground: 'rgb(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: '#00AC46',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
        purple: '#734BA5',
        ring: 'rgb(var(--ring) / <alpha-value>)',
        salmon: '#FFB496',
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
        },
        toolbar: '#E6f9E9',
        yellow: '#FFD681',
      },
      container: {
        center: true,
        padding: {
          '2xl': '12rem',
          DEFAULT: '1.6rem',
          md: '1.5rem',
          xl: '2rem',
        },
      },
      fontFamily: {
        body: 'var(--heading-body-family)',
        extra: 'var(--heading-extra-family)',
        heading: 'var(--heading-font-family)',
        title: 'var(--FontFamilytitle)',
      },
      fontSize: {        
        '2xl': ['2.4rem', '3.2rem'], // 24px, 32px
        '2xs': ['1rem', '1.6rem'], // 10px, 16px
        '3xl': ['3rem', '3.6rem'], // 30px, 36px
        '3xs': ['0.8rem', '1.4rem'], // 8px, 14px
        '4xl': ['3.6rem', '4rem'], // 36px, 40px
        '5xl': ['4.8rem', ''], // 48px, 
        '6xl': ['6rem', ''], // 60px,
        '7xl': ['7.2rem', ''], // 72px,
        'base': ['1.6rem', '2.6rem'], // 16px, 26px
        'lg': ['1.8rem', '3rem'], // 18px, 30px
        'sm': ['1.4rem', '2.2rem'], // 14px, 22px
        'xl': ['2rem', '2.8rem'], // 20px, 28px
        'xs': ['1.2rem', '2rem'], // 12px, 20px
      },
      fontWeight: {
        bold: '700',
        light: '300',
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      lineHeight: {
        12: '3rem',
      },
      margin: {
        "1": "0.4rem",
        "2": "0.8rem",
        "3": "1.2rem",
        "4": "1.6rem",
        "5": "2rem",
        "6": "2.4rem",
        "7": "2.8rem",
        "8": "3.2rem",
      },
      minHeight: {
        '1/1': 'calc(100vw / 1 * 1)',
        '4/3': 'calc(100vw / 4 * 3)',
        '16/9': 'calc(100vw / 16 * 9)',
        '21/9': 'calc(100vw / 21 * 9)',
      },
      padding: {
        "1": "0.4rem",
        "2": "0.8rem",
        "3": "1.2rem",
        "4": "1.6rem",
        "5": "2rem",
        "6": "2.4rem",
        "7": "2.8rem",
        "8": "3.2rem",
      },
      textUnderline: {
        position: 'from-font',
        'skip-ink': 'none',
      },
      textUnderlineOffset: {
        15: '15px',
      },
    },
  },
} satisfies Config;
