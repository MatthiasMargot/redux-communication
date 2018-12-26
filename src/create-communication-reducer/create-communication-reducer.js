import * as config                                      from '../config'
import { REQUESTED, REQUEST_SUCCEEDED, REQUEST_FAILED } from '../action-types'

const createCommunicationReducer = () => {
  const isRequestedMatch = new RegExp(`^${config.actionTypePrefix} .* ${REQUESTED}`)
  const isFailedMatch = new RegExp(`^${config.actionTypePrefix} .* ${REQUEST_FAILED}`)
  const isSucceededMatch = new RegExp(`^${config.actionTypePrefix} .* ${REQUEST_SUCCEEDED}`)

  return (state = {}, action) => {
    const { type, payload, meta } = action

    if (isRequestedMatch.test(type)) {
      return {
        ...state,
        [ meta.namespace ]: {
          fetching: true,
          error:    undefined,
        },
      }
    }

    if (isFailedMatch.test(type)) {
      return {
        ...state,
        [ meta.namespace ]: {
          fetching: false,
          error:    payload.error,
        },
      }
    }

    if (isSucceededMatch.test(type)) {
      return {
        ...state,
        [ meta.namespace ]: {
          fetching: false,
          response: payload.response,
          error:    undefined,
        },
      }
    }

    return state
  }
}

export default createCommunicationReducer
