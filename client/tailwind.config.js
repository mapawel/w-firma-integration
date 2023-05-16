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
                sm: '1rem',
                base: '2rem',
                xl: '1.25rem',
                '2xl': '1.563rem',
                '3xl': '1.953rem',
                '4xl': '2.441rem',
                '5xl': '3.052rem',
              },
              colors: {
                white: '#FFFFFF',
                black: '#000000',
                primary: '#4F8CBA',
                primaryLight: '#D7E5EF',
                secondary: '#5F5F5F',
                secondaryLigt: '#F1F1F1',
                cta: '#BA6361',
                lightGlass: '#4F8CBA1A',
                darkGlass: '#4F8CBAD4',
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
