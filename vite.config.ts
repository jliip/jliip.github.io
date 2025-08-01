import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // 用户页面使用根路径
  build: {
    outDir: 'dist',  // 输出到项目根目录的 dist 文件夹
    rollupOptions: {
      output: {
        // 为JS和CSS文件添加hash，防止缓存问题
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})
