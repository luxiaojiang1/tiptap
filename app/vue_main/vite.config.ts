import vue from '@vitejs/plugin-vue'
import path, { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const Filename = fileURLToPath(import.meta.url)
const Dirname = dirname(Filename)

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(Dirname, 'src'),
      // 直接使用源码，绕过 unbuild stub
      '@tiptap/core/jsx-runtime': resolve(Dirname, '../../packages/core/src/jsx-runtime.ts'),
      '@tiptap/core': resolve(Dirname, '../../packages/core/src/index.ts'),
      '@tiptap/starter-kit': resolve(Dirname, '../../packages/starter-kit/src/index.ts'),

      // @tiptap/pm 的所有子模块
      '@tiptap/pm/state': resolve(Dirname, '../../packages/pm/state/index.ts'),
      '@tiptap/pm/model': resolve(Dirname, '../../packages/pm/model/index.ts'),
      '@tiptap/pm/view': resolve(Dirname, '../../packages/pm/view/index.ts'),
      '@tiptap/pm/transform': resolve(Dirname, '../../packages/pm/transform/index.ts'),
      '@tiptap/pm/commands': resolve(Dirname, '../../packages/pm/commands/index.ts'),
      '@tiptap/pm/keymap': resolve(Dirname, '../../packages/pm/keymap/index.ts'),
      '@tiptap/pm/inputrules': resolve(Dirname, '../../packages/pm/inputrules/index.ts'),
      '@tiptap/pm/history': resolve(Dirname, '../../packages/pm/history/index.ts'),
      '@tiptap/pm/schema-list': resolve(Dirname, '../../packages/pm/schema-list/index.ts'),
      '@tiptap/pm/schema-basic': resolve(Dirname, '../../packages/pm/schema-basic/index.ts'),
      '@tiptap/pm/gapcursor': resolve(Dirname, '../../packages/pm/gapcursor/index.ts'),
      '@tiptap/pm/dropcursor': resolve(Dirname, '../../packages/pm/dropcursor/index.ts'),
      '@tiptap/pm/menu': resolve(Dirname, '../../packages/pm/menu/index.ts'),
      '@tiptap/pm/collab': resolve(Dirname, '../../packages/pm/collab/index.ts'),
      '@tiptap/pm/changeset': resolve(Dirname, '../../packages/pm/changeset/index.ts'),
      '@tiptap/pm/markdown': resolve(Dirname, '../../packages/pm/markdown/index.ts'),
      '@tiptap/pm/tables': resolve(Dirname, '../../packages/pm/tables/index.ts'),
      '@tiptap/pm/trailing-node': resolve(Dirname, '../../packages/pm/trailing-node/index.ts'),
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将 my- 开头的标签识别为自定义元素
          isCustomElement: tag => tag.startsWith('my-') || tag.startsWith('sl-') || tag.startsWith('h5-'),
        },
      },
    }),
  ],
  server: {
    port: 3001,
    strictPort: false,
    watch: {
      ignored: ['!**/ui/h5_shoelace_ui/**', '!**/editor_sync/editor/**'],
      usePolling: true,
      interval: 100,
    },
  },
  optimizeDeps: {
    // ⭐ 关键配置：排除 workspace 依赖，防止预构建缓存
    exclude: ['@l_h5_tool/h5_shoelace_ui', '@l_h5_tool/editor'],
    include: ['@shoelace-style/shoelace'],
  },

  build: {},
  ssr: {
    noExternal: ['@l_h5_tool/h5_shoelace_ui'],
  },
})
