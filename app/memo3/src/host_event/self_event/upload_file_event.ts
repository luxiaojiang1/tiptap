import { CurrentEventAdapter } from '@/host_event/host_adapter'

export function EmitHoseSelectFile(payload: { eventId: string; maxSize?: number }) {
  console.log('HoseSelectFile 1', payload)
  CurrentEventAdapter.emit('HoseSelectFile', payload)
}

export function OnHostSelectFileEnd(cb: (payload: { localSrc: string; eventId?: string }) => void) {
  CurrentEventAdapter.on('HostSelectFileEnd', cb)
}
