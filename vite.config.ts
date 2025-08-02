import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // 用户页面使用根路径
  assetsInclude: ['**/*.md'], // 确保 markdown 文件被当作资源处理
  build: {
    outDir: 'dist',  // 输出到项目根目录的 dist 文件夹
    rollupOptions: {
      output: {
        // 为JS和CSS文件添加hash，防止缓存问题
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // 确保所有资源都被正确复制
    copyPublicDir: true
  },
  // 添加解析配置确保导入正确工作
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
