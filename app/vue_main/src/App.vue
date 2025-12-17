<script setup lang="ts">
import { Log } from '@l_h5_tool/log'

import { ref } from 'vue'
import EditorMain from './pages/editor/EditorMain.vue'
import Memo3Main from './pages/memo3/Memo3Main.vue'

Log.openAll()

window.Log = Log
const logger = Log.getLogger('APP')
logger.log({
  message: 'hello',
})
const page = [
  {
    name: '编辑器例子',
    component: EditorMain,
  },
  {
    name: 'memo3',
    component: Memo3Main,
  },
]
const CurrentComponent = ref()
</script>

<template>
  <button v-for="item in page" :key="item.name" @click="CurrentComponent = item.component">
    {{ item.name }}
  </button>
  <div class="page">
    <component :is="CurrentComponent" />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
