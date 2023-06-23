/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.{js,jsx,ts,tsx,html}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Open Sans', 'sans-serif'],
                serif: ['Source Serif Pro', 'serif'],
              },
              fontSize: {
                sm: '1.2rem',
                base: '1.5rem',
                xl: '1.8rem',
                '2xl': '2.3rem',
                '3xl': '3.2rem',
                '4xl': '4.5rem',
                '5xl': '6rem',
              },
              colors: {
                white: '#FFFFFF',
                black: '#000000',
                primary: '#4F8CBA',
                primaryHover: '#407299',
                primaryLight: '#D7E5EF',
                secondary: '#5F5F5F',
                secondaryLight: '#B1B1B1',
                cta: '#BA6361',
                ctaHover: '#7c3836',
                lightGlass: '#4F8CBA1A',
                darkGlass: '#001015A4',
                warn: '#B4AD4C',
                success: '#2A7320',
              },
              fontWeight: {
                light: '300',
                regular: '400',
                semibold: '600',
                bold: '700',
                black: '800',
              }
        }
    },
    plugins: [],
};
