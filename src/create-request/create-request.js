import createAction                from '../create-action'
import createCommunicationSelector from '../create-communication-selector'
import {
  createRequestedActionType,
  createRequestFailedActionType,
  createRequestSucceededActionType,
}                                  from '../create-communication-action-type'

const createRequest = (namespace, request) => {
  const requestActionType = createRequestedActionType(namespace)

  const requestSucceededActionType = createRequestSucceededActionType(namespace)

  const requestFailedActionType = createRequestFailedActionType(namespace)

  const requestMeta = { request, namespace }

  const requestActionCreator = (...requestArgs) =>
    createAction(
      requestActionType,
      { requestArgs },
      requestMeta,
    )

  const requestCommunicationSelector = createCommunicationSelector(namespace)

  const actionTypes = {
    requested: requestActionType,
    succeeded: requestSucceededActionType,
    failed:    requestFailedActionType,
  }

  return [
    requestActionCreator,
    requestCommunicationSelector,
    actionTypes,
  ]
}

export default createRequest
