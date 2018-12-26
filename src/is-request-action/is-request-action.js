import isFsaCompliant from '../is-fsa-compliant'

const isRequestAction = action => {
  const { meta } = action

  return Boolean(
    meta
    && meta.request
    && meta.namespace
    && isFsaCompliant(action),
  )
}

export default isRequestAction
