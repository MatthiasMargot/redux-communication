import createCommunicationSelector          from '../create-communication-selector'
import * as communicationActionTypeCreators from '../create-communication-action-type'
import overwriteDeep                        from '../overwrite-deep/overwrite-deep'
import { REQUESTED }                        from '../action-types'

const {
  createRequestedActionType,
  createRequestFailedActionType,
  createRequestSucceededActionType,
} = communicationActionTypeCreators

const createRequest = (
  namespace,
  request,
  partialActions,
) => {
  const {
    init = {},
    failure = {},
    success = {},
  } = partialActions || {}

  const requestMeta = {
    request,
    namespace,
    partialSuccess:       success,
    partialFailure:       failure,
    requestLifecycleType: REQUESTED,
  }

  const requestActionCreator = (...requestArgs) => {
    const initAction = {
      type:    createRequestedActionType(namespace),
      payload: { requestArgs },
      meta:    requestMeta,
    }

    return overwriteDeep(
      initAction,
      init,
    )
  }

  const requestCommunicationSelector = createCommunicationSelector(namespace)

  const actionTypes = {
    requested: init.type || createRequestedActionType(namespace),
    succeeded: success.type || createRequestSucceededActionType(namespace),
    failed:    failure.type || createRequestFailedActionType(namespace),
  }

  return [ requestActionCreator, requestCommunicationSelector, actionTypes ]
}

export default createRequest
