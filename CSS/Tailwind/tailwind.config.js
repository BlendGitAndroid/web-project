/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    //添加样式，并不会替换掉所有的
    extend: {
      animation: {
        //test: '1s'
        slide: 'slide 1s linear infinite'
      },
      keyframes: {
        slide: {
          '0%': {
            transform: 'translateX(200px)',
            opacity: 0
          },
          '100%': {
            transform: 'translateX(0px)',
            opacity: 1
          },
        }
      }
    },
    //会替换掉所有相关样式
    /* animation: {
      test: '1s'
    } */
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  darkMode: "class"
}

