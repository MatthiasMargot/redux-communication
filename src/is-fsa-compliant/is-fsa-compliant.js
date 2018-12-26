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
  return typeof type === 'string'
    && (!payload || payload instanceof Object)
    && (!meta || meta instanceof Object)
    && (error === undefined || typeof error === 'boolean')
}

export default isFsaCompliant
