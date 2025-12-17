<script setup lang="ts">
import { ref } from 'vue'
// vue3
import WujieVue from 'wujie-vue3'

import { EmitHostSelectFileEnd, OnHoseSelectFile } from '@/pages/memo3/web_host_event/upload_file_event'
import '@l_h5_tool/h5_shoelace_ui/core'
import '@l_h5_tool/h5_shoelace_ui/dist/style.css'

const { bus, setupApp, preloadApp, destroyApp } = WujieVue

const modalOpen = ref(false)

const FileRef = ref()
OnHoseSelectFile(() => {
  if (FileRef.value) {
    FileRef.value.value = '' // 清空input，确保相同文件也能触发change事件
    FileRef.value.click()
  }
})

const Manager = {
  onSelectFile: async (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return

    // 生成文件访问地址
    const fileUrl = URL.createObjectURL(file)
    console.log('文件:', file)
    console.log('访问地址:', fileUrl)

    EmitHostSelectFileEnd({
      localSrc: fileUrl,
    })
  },
}
</script>

<template>
  <input ref="FileRef" type="file" @change="Manager.onSelectFile" />
  <div>
    <button @click="modalOpen = true">打开memo</button>
  </div>

  <my-modal width="800px" height="600px" :open="modalOpen" modal-title="基础弹窗" @close="modalOpen = false">
    <div class="modal-content">
      <WujieVue
        width="100%"
        height="100%"
        name="appA"
        url="http://localhost:8081/?doc_name=doc1&user_name=a"
        :sync="true"
      />
      <div />
    </div>
  </my-modal>
</template>

<style scoped lang="scss">
.modal-content {
  width: 100%;
  height: 500px;
}
</style>
