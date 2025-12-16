import { useState } from 'react'
import './App.css'

import { bus } from 'wujie'

import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

// 接收主应用消息
bus.$on('msg-to-child', data => {
  console.log('收到母应用消息：', data, data?.fun?.())
})

// 发送消息给主应用
bus.$emit('msg-from-child', { text: 'hello mother' })

function App() {
  return (
    <>
      <SimpleEditor></SimpleEditor>
    </>
  )
}

export default App
