/*
 * returns whether or not a given action is compliant with
 * the FSA specification
 *
 * https://github.com/redux-utilities/flux-standard-action
 * */

function isFsaCompliant ({
  type,
  payload,
  meta,
  error,
}) {
  const typeIsString = typeof type === 'string'

  const payloadIsMissingOrObject = !payload || payload instanceof Object

  const metaIsMissingOrObject = !meta || meta instanceof Object

  const errorIsMissingOrBoolean = error === undefined || typeof error === 'boolean'

  return (
    typeIsString
    && payloadIsMissingOrObject
    && metaIsMissingOrObject
    && errorIsMissingOrBoolean
  )
}

export default isFsaCompliant
