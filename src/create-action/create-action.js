const createAction = (type, payload = {}, meta = {}, error = false) => ({
  type,
  payload,
  meta,
  error,
})

export default createAction
