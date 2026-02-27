import { createVmState, resetState } from './runner'
import { initGenPools } from './vm-ops-gens'
import { VmState } from './vm-state'

class AudioVmManager {
  private vms: Array<VmState> = new Array<VmState>()

  // @ts-ignore
  // @inline
  get(vmId: i32): VmState {
    if (vmId < 0) vmId = 0
    while (this.vms.length <= vmId) {
      const state = createVmState()
      initGenPools(state)
      this.vms.push(state)
    }
    return this.vms[vmId]
  }

  // @ts-ignore
  // @inline
  reset(vmId: i32): void {
    if (vmId < 0) vmId = 0
    while (this.vms.length <= vmId) {
      const state = createVmState()
      initGenPools(state)
      this.vms.push(state)
    }
    resetState(this.vms[vmId])
  }
}

export const audioVms: AudioVmManager = new AudioVmManager()
