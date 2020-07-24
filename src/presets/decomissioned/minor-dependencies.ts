import { SCHEDULE } from '@constants/renovate'
import { createPreset } from '@lib/preset-factory'

export default createPreset({
  packageRules: [
    {
      updateTypes: [ 'minor', 'patch', 'pin', 'digest' ],
      labels: [ 'renovate', 'minor', 'automerge' ],
      schedule: [ SCHEDULE.TWICE_A_DAY ],
      automerge: true
    }
  ]
})