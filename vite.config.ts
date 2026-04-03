export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : process.env.NODE_ENV === 'production' ? '/mortgage_LO_landingpage
/' : '/',
})
