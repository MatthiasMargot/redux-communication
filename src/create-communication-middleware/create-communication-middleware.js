import { isRequestAction }                                                 from '../is-request-action'
import { createRequestSucceededActionType, createRequestFailedActionType } from '../create-communication-action-type'
import overwriteDeep                                                       from '../overwrite-deep/overwrite-deep'
import { REQUEST_FAILED, REQUEST_SUCCEEDED }                               from '../action-types'

const createCommunicationMiddleware = () => store => next => action => {
  next(action)

  if (!isRequestAction(action)) return

  const {
    meta,
    payload = {},
  } = action

  const {
    namespace,
    request,
    partialSuccessAction = {},
    partialFailureAction = {},
  } = meta

  const args = payload.requestArgs || []

  return request(...args)
    .then(response => {
      const successAction = overwriteDeep(
        {
          type:    createRequestSucceededActionType(namespace),
          payload: { response },
          meta:    {
            namespace,
            requestLifecycleType: REQUEST_SUCCEEDED,
          },
        },
        partialSuccessAction,
      )

      store.dispatch(successAction)

      return response
    })
    .catch(error => {
      const failureAction = overwriteDeep(
        {
          type:    createRequestFailedActionType(namespace),
          payload: { error },
          meta:    {
            namespace,
            requestLifecycleType: REQUEST_FAILED,
          },
        },
        partialFailureAction,
      )

      store.dispatch(failureAction)

      throw error
    })
}

export default createCommunicationMiddleware
