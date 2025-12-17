# api调研部分
1. 如何以json形式添加各种形式的数据（p0）
2. 格式化、光标、插入、删除整理（p2）

# 架构设计部分
1. 各端兼容方案（p1）
```
目前方案：编辑器纯web微服务（wujie）+事件Adapter+宿主引用
1. 编辑器功能部分：略
2. 接口定义，编辑器唯一认识的外部功能
export interface HostAdapter {
  uploadFile(file: File, meta?: any): Promise<UploadResult>
  openFilePicker(): Promise<File[]>
  on(event: string, cb: Function): void
  emit(event: string, data: any): void
}
3. 各端架子啊适配
a、Electron：
export const electronAdapter: HostAdapter = {
  uploadFile(file) {
    return new Promise(resolve => {
      window.__WUJIE__.bus.$emit('upload', { file })
      window.__WUJIE__.bus.$once('upload-result', resolve)
    })
  }
}
b、android
export const androidAdapter: HostAdapter = {
  uploadFile(file) {
    return window.Android.upload(file)
  }
}
c、ios
export const iosAdapter: HostAdapter = { // 这里可能与androidAdapter一样
  uploadFile(file) {
    return window.Android.upload(file)
  }
}
d、纯web
export const webAdapter: HostAdapter = {
  uploadFile(file) {
    return uploadToServer(file)
  }
}

编辑器初始化时，使用：
export function resolveHostAdapter(): HostAdapter {
  if (window.__WUJIE__) return electronAdapter
  if (安卓) return androidAdapter
  if (ios) return iosAdapter
  if (桌面端) return iosAdapter
  return webAdapter // 无宿主
}

```
2. Adapter事件协议（双向通讯）设计,功能如下；
```
文件：上传（过程、结果、local地址、server地址）
数据：通讯录等
常量：wss地址。
初始化编辑信息

注意：http在事件协议做、鉴权相关在宿主端做。
```

# 功能部分
## 1.自定义组件接入
+ 自定义开发lit项目构建与加载，编辑器使用（p2）
