import { SCHEDULE } from '@constants/renovate'
import { createPreset } from '@lib/preset-factory'

/**
 * Auto-merge all development dependencies.
 */

export default createPreset({
  packageRules: [
    {
      depTypeList: [ 'devDependencies' ],
      automerge: true,
      schedule: [ SCHEDULE.ANY ]
    }
  ]
})