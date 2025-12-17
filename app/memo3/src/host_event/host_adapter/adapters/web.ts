import type { HostAdapter } from '@/host_adapter/type.ts'

import Wujie from 'wujie-react'

const { bus } = Wujie

export const WebAdapter: HostAdapter = {
  emit(eventName: string, payload) {
    bus.$emit(eventName, payload)
  },
  on(eventName: string, cb: (payload: any) => void) {
    bus.$on(eventName, cb)
  },
  emitAsync(event: any) {
    // 这里要有等待的
  },
}
