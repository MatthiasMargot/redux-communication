import isFsaCompliant                        from '../is-fsa-compliant'
import { REQUEST_FAILED, REQUEST_SUCCEEDED } from '../action-types'

export const isRequestAction = action => {
  const { meta } = action

  return Boolean(
    meta
    && meta.request
    && meta.namespace
    && isFsaCompliant(action),
  )
}

export const isRequestFailedAction = action =>
  action.meta.requestLifecycleType === REQUEST_FAILED

export const isRequestSucceededAction = action =>
  action.meta.requestLifecycleType === REQUEST_SUCCEEDED
