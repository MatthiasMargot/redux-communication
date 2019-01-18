/*
 * (object, object) => object
 *
 * recursively replaces a given object's values with a given
 * overwrite object's values, while leaving unspecified properties
 * intact
 * */

function overwriteDeep (initial, overwrite) {
  return Object.keys(overwrite).reduce(
    (reduction, key) => ({
      ...reduction,
      [ key ]: overwrite[ key ] instanceof Object
        ? overwriteDeep(initial[ key ], overwrite[ key ])
        : overwrite[ key ],
    }),
    { ...initial },
  )
}

export default overwriteDeep
