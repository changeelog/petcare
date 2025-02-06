import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './widgets/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-geist-sans)',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: [
          'var(--font-geist-mono)',
          ...defaultTheme.fontFamily.mono,
        ],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
        sidebar: {
          'DEFAULT': 'hsl(var(--sidebar-background))',
          'foreground': 'hsl(var(--sidebar-foreground))',
          'primary': 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          'accent': 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          'border': 'hsl(var(--sidebar-border))',
          'ring': 'hsl(var(--sidebar-ring))',
        },
        ds: {
          background: {
            100: 'hsl(var(--ds-background-100))',
            200: 'hsl(var(--ds-background-200))',
          },
          gray: {
            100: 'hsl(var(--ds-gray-100))',
            200: 'hsl(var(--ds-gray-200))',
            300: 'hsl(var(--ds-gray-300))',
            400: 'hsl(var(--ds-gray-400))',
            500: 'hsl(var(--ds-gray-500))',
            600: 'hsl(var(--ds-gray-600))',
            700: 'hsl(var(--ds-gray-700))',
            800: 'hsl(var(--ds-gray-800))',
            900: 'hsl(var(--ds-gray-900))',
            1000: 'hsl(var(--ds-gray-1000))',
          },
          blue: {
            100: 'hsl(var(--ds-blue-100))',
            200: 'hsl(var(--ds-blue-200))',
            300: 'hsl(var(--ds-blue-300))',
            400: 'hsl(var(--ds-blue-400))',
            500: 'hsl(var(--ds-blue-500))',
            600: 'hsl(var(--ds-blue-600))',
            700: 'hsl(var(--ds-blue-700))',
            800: 'hsl(var(--ds-blue-800))',
            900: 'hsl(var(--ds-blue-900))',
            1000: 'hsl(var(--ds-blue-1000))',
          },
          red: {
            100: 'hsl(var(--ds-red-100))',
            200: 'hsl(var(--ds-red-200))',
            300: 'hsl(var(--ds-red-300))',
            400: 'hsl(var(--ds-red-400))',
            500: 'hsl(var(--ds-red-500))',
            600: 'hsl(var(--ds-red-600))',
            700: 'hsl(var(--ds-red-700))',
            800: 'hsl(var(--ds-red-800))',
            900: 'hsl(var(--ds-red-900))',
            1000: 'hsl(var(--ds-red-1000))',
          },
          amber: {
            100: 'hsl(var(--ds-amber-100))',
            200: 'hsl(var(--ds-amber-200))',
            300: 'hsl(var(--ds-amber-300))',
            400: 'hsl(var(--ds-amber-400))',
            500: 'hsl(var(--ds-amber-500))',
            600: 'hsl(var(--ds-amber-600))',
            700: 'hsl(var(--ds-amber-700))',
            800: 'hsl(var(--ds-amber-800))',
            900: 'hsl(var(--ds-amber-900))',
            1000: 'hsl(var(--ds-amber-1000))',
          },
          green: {
            100: 'hsl(var(--ds-green-100))',
            200: 'hsl(var(--ds-green-200))',
            300: 'hsl(var(--ds-green-300))',
            400: 'hsl(var(--ds-green-400))',
            500: 'hsl(var(--ds-green-500))',
            600: 'hsl(var(--ds-green-600))',
            700: 'hsl(var(--ds-green-700))',
            800: 'hsl(var(--ds-green-800))',
            900: 'hsl(var(--ds-green-900))',
            1000: 'hsl(var(--ds-green-1000))',
          },
          teal: {
            100: 'hsl(var(--ds-teal-100))',
            200: 'hsl(var(--ds-teal-200))',
            300: 'hsl(var(--ds-teal-300))',
            400: 'hsl(var(--ds-teal-400))',
            500: 'hsl(var(--ds-teal-500))',
            600: 'hsl(var(--ds-teal-600))',
            700: 'hsl(var(--ds-teal-700))',
            800: 'hsl(var(--ds-teal-800))',
            900: 'hsl(var(--ds-teal-900))',
            1000: 'hsl(var(--ds-teal-1000))',
          },
          purple: {
            100: 'hsl(var(--ds-purple-100))',
            200: 'hsl(var(--ds-purple-200))',
            300: 'hsl(var(--ds-purple-300))',
            400: 'hsl(var(--ds-purple-400))',
            500: 'hsl(var(--ds-purple-500))',
            600: 'hsl(var(--ds-purple-600))',
            700: 'hsl(var(--ds-purple-700))',
            800: 'hsl(var(--ds-purple-800))',
            900: 'hsl(var(--ds-purple-900))',
            1000: 'hsl(var(--ds-purple-1000))',
          },
          pink: {
            100: 'hsl(var(--ds-pink-100))',
            200: 'hsl(var(--ds-pink-200))',
            300: 'hsl(var(--ds-pink-300))',
            400: 'hsl(var(--ds-pink-400))',
            500: 'hsl(var(--ds-pink-500))',
            600: 'hsl(var(--ds-pink-600))',
            700: 'hsl(var(--ds-pink-700))',
            800: 'hsl(var(--ds-pink-800))',
            900: 'hsl(var(--ds-pink-900))',
            1000: 'hsl(var(--ds-pink-1000))',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
}
export default config
