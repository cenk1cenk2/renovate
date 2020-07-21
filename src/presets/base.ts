import { TIMEZONE } from '@constants/constants'
import { SCHEDULE } from '@constants/renovate'
import { ASSIGNEES } from '@constants/users'
import { createPreset } from '@lib/preset-factory'

export default createPreset({
  extends: [ 'config:base', ':masterIssue' ],
  ignorePresets: [ ':prHourlyLimit2' ],
  timezone: TIMEZONE,
  semanticCommits: true,
  rangeStrategy: 'update-lockfile',
  assignees: ASSIGNEES,
  labels: [ 'deps' ],
  lockFileMaintenance: {
    enabled: true,
    automerge: true,
    schedule: [ SCHEDULE.DAILY ]
  },
  major: {
    stabilityDays: 3
  },
  schedule: [ SCHEDULE.DAILY ],
  prCreation: 'immediate'
})