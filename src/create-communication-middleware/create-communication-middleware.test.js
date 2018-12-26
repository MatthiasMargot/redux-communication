import createAction                  from '../create-action'
import {
  createRequestSucceededActionType,
  createRequestFailedActionType,
}                                    from '../create-communication-action-type'
import createCommunicationMiddleware from './create-communication-middleware'

const namespace = 'namespace'

describe('createCommunicationMiddleware', () => {
  let middleware
  let store
  let next

  beforeEach(() => {
    store = { dispatch: jest.fn() }
    next = jest.fn()
    middleware = createCommunicationMiddleware()(store)(next)
  })

  describe('the returned communicationMiddleware', () => {
    it('calls the next middleware in the chain', () => {
      middleware({})

      expect(next).toHaveBeenCalled()
    })

    it('returns early with not value if the action is not a request-action', () => {
      const returnValue = middleware({})

      expect(returnValue).toEqual(undefined)
    })

    it('calls the request function with the provided requestArguments', () => {
      const request = jest.fn().mockReturnValue(Promise.resolve())
      const requestArgs = [ 'foo', 'bar', 'baz' ]

      middleware({
        type:    'type',
        payload: { requestArgs },
        meta:    { namespace, request },
      })

      expect(request).toHaveBeenCalledWith(...requestArgs)
    })

    it('calls dispatch with a \'requestSucceeded\' action on success', async () => {
      const response = { foo: 'bar' }

      const request = jest.fn().mockReturnValue(Promise.resolve(response))

      await middleware({
        type: 'type',
        meta: { namespace, request },
      })

      const requestSucceededAction = createAction(
        createRequestSucceededActionType(namespace),
        { response },
        { namespace },
      )

      expect(store.dispatch).toHaveBeenCalledWith(requestSucceededAction)
    })

    it('calls dispatch with a \'requestSucceeded\' action on failure', async () => {
      const error = { status: 403 }

      const request = jest.fn().mockReturnValue(Promise.reject(error))

      const action = { type: 'type', meta: { namespace, request } }

      const requestFailedAction = createAction(
        createRequestFailedActionType(namespace),
        { error },
        { namespace },
      )

      try {
        await middleware(action)
      } catch (e) {
        expect(e).toEqual(error)
      }

      expect(store.dispatch).toHaveBeenCalledWith(requestFailedAction)
    })
  })
})
