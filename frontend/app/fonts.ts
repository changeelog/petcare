import localFont from 'next/font/local';

export const minSans = localFont({
  src: [
    {
      path: './fonts/woff2/MinSans-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/woff2/MinSans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/woff2/MinSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/woff2/MinSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/woff2/MinSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: "./fonts/woff2/MinSans-Black.woff2",
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-min-sans',
  display: 'swap'
})

export const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'fallback'
})

export const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
})

export const fonts = {
  minSans,
  geistSans,
  geistMono,
}
