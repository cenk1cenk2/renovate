import { SCHEDULE } from '@constants/renovate'
import { createPreset } from '@lib/preset-factory'

export default createPreset({
  packageRules: [
    {
      packagePatterns: [ '*' ],
      depTypeList: [ 'devDependencies' ],
      groupName: 'all development dependency updates',
      groupSlug: 'all-dev',
      commitMessageSuffix: '[skip ci]',
      labels: [ 'renovate', 'dev-deps', 'automerge' ],
      automerge: true,
      schedule: [ SCHEDULE.ANY ]
    }
  ]
})
