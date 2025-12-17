import type { HostAdapter } from './type.ts'
import { WebAdapter } from './adapters/web.ts'

function ResolveHostAdapter(): HostAdapter {
  // if (window.__WUJIE__)
  return WebAdapter
}

export const CurrentEventAdapter = ResolveHostAdapter()
