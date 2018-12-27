import * as config                                      from '../config'
import { REQUESTED, REQUEST_SUCCEEDED, REQUEST_FAILED } from '../action-types'

const handleRequested = (state, { meta }) => ({
  ...state,
  [ meta.namespace ]: {
    fetching: true,
    error:    undefined,
  },
})

const handleFailed = (state, { payload, meta }) => ({
  ...state,
  [ meta.namespace ]: {
    fetching: false,
    error:    payload.error,
  },
})

const handleSucceeded = (state, { payload, meta }) => ({
  ...state,
  [ meta.namespace ]: {
    fetching: false,
    response: payload.response,
    error:    undefined,
  },
})

const createCommunicationReducer = () => {
  const isRequestedMatch = new RegExp(`^${config.actionTypePrefix} .* ${REQUESTED}`)
  const isFailedMatch = new RegExp(`^${config.actionTypePrefix} .* ${REQUEST_FAILED}`)
  const isSucceededMatch = new RegExp(`^${config.actionTypePrefix} .* ${REQUEST_SUCCEEDED}`)

  return (state = {}, action) => {
    const { type } = action

    if (isRequestedMatch.test(type)) return handleRequested(state, action)

    if (isFailedMatch.test(type)) return handleFailed(state, action)

    if (isSucceededMatch.test(type)) return handleSucceeded(state, action)

    return state
  }
}

export default createCommunicationReducer
