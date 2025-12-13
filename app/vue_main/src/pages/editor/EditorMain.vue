<script setup lang="ts">
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { onMounted, ref } from 'vue'

const EditorRootRef = ref()

onMounted(() => {
  const editorInstance = new Editor({
    element: EditorRootRef.value,
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  })
  window.editorInstance = editorInstance
})
/* api */
// 光标：获取、设置
// 插入：文本、图片

// todo 选区：

// todo delete

// 获取当前数据：html、xml（json，对标delta）
</script>

<template>
  <div ref="EditorRootRef" class="editor-root" />
</template>

<style scoped>
.editor-root {
  color: #888;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  height: 300px;
}
</style>
