import WujieVue from 'wujie-vue3'

const { bus } = WujieVue
export function EmitHostSelectFileEnd(data: { eventId?: string; localSrc: string }) {
  console.log('EmitHostSelectFileEnd', data)
  bus.$emit('HostSelectFileEnd', data)
}

export function OnHoseSelectFile(cb: (payload: any, id?: string) => void) {
  bus.$on('HoseSelectFile', cb)
}
