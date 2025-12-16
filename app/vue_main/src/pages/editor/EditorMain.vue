<script setup lang="ts">
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { onMounted, ref } from 'vue'

const EditorRootRef = ref()
let editorInstance

onMounted(() => {
  editorInstance = new Editor({
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
const 光标测试 = [
  {
    text: '获取当前光标',
    onClick: () => {
      if (!editorInstance || editorInstance.isDestroyed) {return}
      const { from, to, $anchor, $head } = editorInstance.state.selection
      console.log('选区内容:', editorInstance.state.doc.textBetween(from, to))
      console.log('选区信息:', {
        from, // 选区起始
        to, // 选区结束
        anchor: $anchor.pos, // 锚点位置（开始选择的点）
        head: $head.pos, // 头部位置（当前拖动到的点）
        isEmpty: from === to, // 是否为空选区（只是光标）
      })
    },
  },
  {
    text: '设置光标为第一行第二列',
    onClick: () => {
      if (!editorInstance || editorInstance.isDestroyed) {return}
      // 设置光标到位置2（第一行第二列，0-based索引从1开始因为有段落标签）
      editorInstance.commands.setTextSelection(2)
      editorInstance.commands.focus()
      console.log('光标已设置到位置2')
    },
  },
  {
    text: '选中测试',
    onClick: () => {
      if (!editorInstance || editorInstance.isDestroyed) {return}
      // 选中前5个字符
      const from = 1
      const to = Math.min(6, editorInstance.state.doc.content.size - 1)
      editorInstance.commands.setTextSelection({ from, to })
      editorInstance.commands.focus()
      console.log(`已选中位置 ${from} 到 ${to}`)
    },
  },
]

const 内容测试 = [
  {
    text: '当前位置插入一个字符',
    onClick: () => {
      // if (!editorInstance || editorInstance.isDestroyed)
      //   return
      // const { from } = editorInstance.state.selection
      // editorInstance.commands.insertContentAt(from, '测')
      editorInstance.chain().insertContentAt(editorInstance.state.selection.from, '测').run()
      // editorInstance.commands.insertContent('测')
      // editorInstance.commands.focus()
      console.log('已在位置', '插入字符"测"')
    },
  },
  {
    text: '当前位置删除一个字符',
    onClick: () => {
      if (!editorInstance || editorInstance.isDestroyed) {return}
      const { from } = editorInstance.state.selection
      if (from > 1) {
        // 删除光标前一个字符
        editorInstance.commands.deleteRange({ from: from - 1, to: from })
        editorInstance.commands.focus()
        console.log('已删除位置', from - 1, '到', from, '的字符')
      } else {
        console.log('已在文档开始位置，无法删除')
      }
    },
  },
  {
    text: '其他',
    onClick: () => {
      editorInstance
        .chain()
        .insertContent({
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: '你好 tiptap',
                },
              ],
            },
          ],
        })
        .focus()
        .run()
    },
  },
]
</script>

<template>
  <div>
    <button v-for="config in 光标测试" :key="config.text" @click="config.onClick">
      {{ config.text }}
    </button>
    <button v-for="config in 内容测试" :key="config.text" @click="config.onClick">
      {{ config.text }}
    </button>
  </div>
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
