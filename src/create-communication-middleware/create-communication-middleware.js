import createAction                                                        from '../create-action'
import isRequestAction                                                     from '../is-request-action'
import {
  createRequestSucceededActionType,
  createRequestFailedActionType,
} from '../create-communication-action-type'

const createCommunicationMiddleware = () => ({ dispatch }) => next => action => {
  next(action)

  if (!isRequestAction(action)) return

  const { meta, payload } = action

  const { namespace } = meta

  const { request } = meta

  const args = (payload && payload.requestArgs) || []

  return request(...args)
    .then(response => {
      dispatch(
        createAction(
          createRequestSucceededActionType(namespace),
          { response },
          { namespace },
        ),
      )

      return response
    })
    .catch(error => {
      dispatch(
        createAction(
          createRequestFailedActionType(namespace),
          { error },
          { namespace },
        ),
      )

      throw error
    })
}

export default createCommunicationMiddleware
