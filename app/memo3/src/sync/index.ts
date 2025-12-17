import { HocuspocusProvider } from '@hocuspocus/provider'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCaret from '@tiptap/extension-collaboration-caret'
import * as Y from 'yjs'

const params = new URLSearchParams(window.location.search)

// 获取单个参数
const docName = params.get('doc_name') // "123"
const userName = params.get('user_name') // "alice"

if (!docName || !userName) {
  alert('请在地址栏指定userName、user_name,如：http://localhost:8080/?doc_name=doc1&user_name=a')
}

export function GetSyncExtensions() {
  const ydoc = new Y.Doc()

  const provider = new HocuspocusProvider({
    url: 'ws://127.0.0.1:1234',
    name: docName,
    document: ydoc,
  })

  return [
    Collaboration.configure({
      document: ydoc,
    }),
    CollaborationCaret.configure({
      provider,
      user: { name: userName, color: '#ffcc00' },
    }),
  ]
}
