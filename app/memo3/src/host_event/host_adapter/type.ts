export interface HostAdapter {
  emit: (eventType: string, payload: any) => void
  on: (eventType: string, cb: (payload: any, id?: string) => void) => void
  emitAsync?: <T = any>(eventType: string, event: any) => Promise<T>
}
