# Editor ↔ Host 双向通信设计大纲
## 事件协议表

| 事件类型                | 方向            | Payload 示例                                                         | ID | 异步追踪 / 说明                                  | 备注                 |
| ------------------- | ------------- | ------------------------------------------------------------------ | -- | ------------------------------------------ | ------------------ |
| **文件操作**            |               |                                                                    |    |                                            |                    |
| `file:pick`         | Editor → Host | `{ accept: '.png,.jpg', multiple: true }`                          | 可选 | 不需要 Promise，一般同步选择                         | 编辑器请求宿主打开文件选择器     |
| `file:open`         | Host → Editor | `{ path: '/tmp/xxx.png', url: 'http://127.0.0.1:...' }`            | 可选 | 不需要 Promise                                | 宿主主动打开本地文件         |
| `file:delete`       | Editor → Host | `{ id: 'file-123' }`                                               | 必选 | 可返回 Promise 确认删除完成                         | 删除本地文件             |
| `file:read`         | Editor → Host | `{ id: 'file-123' }`                                               | 必选 | 返回 Promise，Payload 为 `{ id, url, status }` | 请求宿主返回本地文件 URL 或内容 |
| `file:ready`        | Host → Editor | `{ id: 'file-123', url: 'http://127.0.0.1/...' }`                  | 必选 | 对应 `file:read` 或 `file:pick`               | 文件准备好，通知编辑器使用      |
| **上传 / 下载**         |               |                                                                    |    |                                            |                    |
| `upload:start`      | Editor → Host | `{ fileId: 'file-123', fileName: 'a.png' }`                        | 必选 | 返回 Promise，可等待 `upload:done`               | 请求宿主上传文件           |
| `upload:progress`   | Host → Editor | `{ fileId: 'file-123', percent: 60 }`                              | 必选 | 对应 `fileId` 追踪进度                           | 上传进度更新             |
| `upload:done`       | Host → Editor | `{ fileId: 'file-123', url: 'http://cdn/...', status: 'success' }` | 必选 | resolve 对应 `upload:start` Promise          | 上传完成               |
| `upload:error`      | Host → Editor | `{ fileId: 'file-123', error: 'Network Error' }`                   | 必选 | reject 对应 `upload:start` Promise           | 上传失败               |
| `download:start`    | Editor → Host | `{ fileId: 'file-123', url: 'http://cdn/...' }`                    | 可选 | 返回 Promise，可等待 `download:done`             | 请求宿主下载文件           |
| `download:progress` | Host → Editor | `{ fileId: 'file-123', percent: 50 }`                              | 必选 | 对应 `fileId` 追踪进度                           | 下载进度               |
| `download:done`     | Host → Editor | `{ fileId: 'file-123', path: '/tmp/a.png', status: 'success' }`    | 必选 | resolve 对应 `download:start` Promise        | 下载完成               |
| **编辑器状态 / 文档**      |               |                                                                    |    |                                            |                    |
| `editor:change`     | Editor → Host | `{ docId: 'doc-1', delta: {...} }`                                 | 可选 | 可批量异步处理，无需 Promise                         | 文档内容变化             |
| `editor:save`       | Editor → Host | `{ docId: 'doc-1' }`                                               | 可选 | Promise 返回保存状态                             | 请求宿主保存文档           |
| `editor:load`       | Host → Editor | `{ docId: 'doc-1', content: {...} }`                               | 可选 | Promise 可返回加载状态                            | 宿主主动加载文档           |
| `editor:readonly`   | Host → Editor | `{ docId: 'doc-1', readonly: true }`                               | 可选 | 不需要 Promise                                | 切换只读模式             |
| `editor:undo`       | Editor → Host | `{ docId: 'doc-1' }`                                               | 可选 | 不需要 Promise                                | 执行撤销操作             |
| `editor:redo`       | Editor → Host | `{ docId: 'doc-1' }`                                               | 可选 | 不需要 Promise                                | 执行重做操作             |
| **系统 / 通知 / 日志**    |               |                                                                    |    |                                            |                    |
| `host:message`      | Host → Editor | `{ type: 'warning', text: '文件过大' }`                                | 可选 | 不需要 Promise                                | 通用消息提示             |
| `host:alert`        | Host → Editor | `{ type: 'error', text: '网络中断' }`                                  | 可选 | 不需要 Promise                                | 弹窗/提示              |
| `editor:log`        | Editor → Host | `{ level: 'warn', message: 'xxx' }`                                | 可选 | 不需要 Promise                                | 编辑器日志传宿主记录         |
| `host:ready`        | Host → Editor | `{ }`                                                              | 可选 | 不需要 Promise                                | 宿主初始化完成，编辑器可以开始操作  |
| `host:error`        | Host → Editor | `{ code: 500, message: 'Internal Error' }`                         | 可选 | 不需要 Promise                                | 通用错误事件             |
               | 可选 | 通用错误事件             |
## 异步追踪说明

1. 上传 / 下载

- 所有异步操作都必须带 fileId。
- emitAsync({type:'upload:start', payload:{fileId}}) 返回 Promise，当收到 upload:done resolve，当收到 upload:error reject。

2. 文件读取

- file:read 返回 Promise，对应 file:ready。

3. 编辑器文档操作

- 保存 / 加载可以返回 Promise，方便等待宿主完成写入或同步。

4. 事件 ID

- 对于需要追踪的操作，ID 必须唯一（如 fileId 或 docId）。
- 非异步事件可以省略 ID。

# 设计原则

1. 事件命名空间明确
- 模块:动作，避免歧义，易扩展。

2. 双向通用

- 整个事件协议集合支持双向数据流，即 Editor 可以向 Host 发起请求，也可以接收 Host 主动通知。但单个事件的触发方向是固定的。

3. 支持异步操作

- 对于上传、下载、文件读取等异步操作，必须带 fileId / docId 或 eventId 做状态追踪。

4. Payload 标准化

- 每个事件只传最必要字段，必要时加 meta 扩展字段。

5. 跨宿主一致性

- Electron（Wujie）/web（（Wujie））/ Android（WebView）/ 浏览器，都能统一接口，不用在编辑器内部判断宿主。


# 实现方式
```typescript
// EditorHostAdapter.ts
export interface EditorHostAdapter {
  emit(event: EditorHostEvent): void
  on(eventType: string, cb: (payload: any, meta?: any) => void): void
  emitAsync?<T = any>(event: EditorHostEvent): Promise<T> // 对需要结果的事件
}

```
```typescript
// 使用示例
hostAdapter.emit({ type: 'upload:start', payload: { fileId: 'f1', fileName: 'a.png' } })
hostAdapter.on('upload:progress', ({ fileId, percent }) => { ... })


```
