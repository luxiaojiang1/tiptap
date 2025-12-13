<script setup lang="ts">
import { Log } from '@l_h5_tool/log'

import EditorMain from './pages/editor/EditorMain.vue'

Log.openAll()

window.Log = Log
const logger = Log.getLogger('APP')
logger.log({
  message: 'hello',
})
</script>

<template>
  <div class="page">
    <EditorMain />
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
