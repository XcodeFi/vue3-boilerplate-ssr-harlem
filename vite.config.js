import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import analyzer from 'rollup-plugin-analyzer'

export default defineConfig({
    resolve: {
        alias: {
            'src': resolve(__dirname, 'src'),
        },
    },
    plugins: [
        vue(),
        analyzer({ summaryOnly: true }),
    ],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `[name]` + hash + `.js`,
                chunkFileNames: `[name]` + hash + `.js`,
                assetFileNames: `[name]` + hash + `.[ext]`
            }
        }
    }
})

// functions.js
export const hash = Math.floor(Math.random() * 90000) + 10000;