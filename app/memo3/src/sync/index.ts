import { HocuspocusProvider } from '@hocuspocus/provider'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCaret from '@tiptap/extension-collaboration-caret'
import * as Y from 'yjs'

export function GetSyncExtensions() {
  const ydoc = new Y.Doc()

  const provider = new HocuspocusProvider({
    url: 'ws://127.0.0.1:1234',
    name: 'example-document',
    document: ydoc,
  })

  return [
    Collaboration.configure({
      document: ydoc,
    }),
    CollaborationCaret.configure({
      provider,
      user: { name: 'John Doe', color: '#ffcc00' },
    }),
  ]
}
