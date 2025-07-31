import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // 用户页面使用根路径
  build: {
    outDir: 'dist'  // 输出到项目根目录的 dist 文件夹
  }
})
