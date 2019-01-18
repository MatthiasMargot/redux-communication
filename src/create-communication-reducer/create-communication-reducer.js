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

const createCommunicationReducer = () =>
  (state = {}, action) => {
    const { meta } = action

    if (!meta || !meta.requestLifecycleType) return state

    const { requestLifecycleType } = meta

    /*
    * we handle default above already
    * */
    /* eslint-disable-next-line default-case */
    switch (requestLifecycleType) {
      case REQUESTED:
        return handleRequested(state, action)

      case REQUEST_SUCCEEDED:
        return handleSucceeded(state, action)

      case REQUEST_FAILED:
        return handleFailed(state, action)
    }
  }

export default createCommunicationReducer
