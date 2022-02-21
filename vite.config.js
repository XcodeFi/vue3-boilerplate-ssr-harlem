import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import analyzer from 'rollup-plugin-analyzer'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
    resolve: {
        alias: {
            'src': resolve(__dirname, 'src'),
        },
    },
    plugins: [
        vue(),
        analyzer({ summaryOnly: true }),
        WindiCSS(),
    ],
})