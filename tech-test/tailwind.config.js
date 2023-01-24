/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primaryPurple: '#9575CD',
                primaryGreen: '#71B406',
                primaryRed: '#EB5757',
                secondaryPurple: '#6A37C5FF',
                darkGray: '#343434',
                lightGreen: '#81C784',
                lightSilver: '#8C9297',
                yellow: '#FBCA36',
                white: '#ffffff',
                whiteSecondary: '#FBFBFB',
            },
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
            },
            fontWeight: {
                semiBold: 600,
                medium: 500,
                regular: 400,
                light: 300
            },
            maxWidth: {
                50: '50%',
                33: '33%',
            },
            fontSize: {
                sm: ['14px', '20px'],
                base: ['16px', '24px'],
                lg: ['20px', '26px'],
                xl: ['24px', '30px'],
            }
        },
    },
    plugins: [],
}
