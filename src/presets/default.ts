import { createPreset } from '@lib/preset-factory'
import { createScope } from '@lib/scope-factory'

export default createPreset({
  extends: [
    createScope('base'),
    createScope('lockFile'),
    createScope('noTests'),
    createScope('groupMinorDependencies'),
    createScope('groupDevDependencies'),
    createScope('groupPeerDependencies'),
    createScope('slowring'),
    createScope('fastring')
  ]
})
