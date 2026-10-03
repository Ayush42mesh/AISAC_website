import {defineConfig} from 'vite';
export default defineConfig({build:{rollupOptions:{output:{manualChunks:{three:['three'],animation:['gsap'],react:['react','react-dom']}}}}});
