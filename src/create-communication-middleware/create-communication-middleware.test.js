import { createRequestSucceededActionType, createRequestFailedActionType } from '../create-communication-action-type'
import createCommunicationMiddleware                                       from './create-communication-middleware'
import { REQUEST_FAILED, REQUEST_SUCCEEDED }                               from '../action-types'

const namespace = 'namespace'

const successResponse = { foo: 'bar' }

const errorResponse = { status: 403 }

describe('createCommunicationMiddleware', () => {
  let middleware
  let store
  let next
  let succeedingRequest
  let failingRequest

  beforeEach(() => {
    store = { dispatch: jest.fn() }
    next = jest.fn()
    middleware = createCommunicationMiddleware()(store)(next)
    succeedingRequest = jest.fn().mockReturnValue(Promise.resolve(successResponse))
    failingRequest = jest.fn().mockReturnValue(Promise.reject(errorResponse))
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
      const requestArgs = [ 'foo', 'bar', 'baz' ]

      middleware({
        type:    'type',
        payload: { requestArgs },
        meta:    { namespace, request: succeedingRequest },
      })

      expect(succeedingRequest).toHaveBeenCalledWith(...requestArgs)
    })

    it('calls dispatch with a \'requestSucceeded\' action on success', async () => {
      await middleware({
        type: 'type',
        meta: { namespace, request: succeedingRequest },
      })

      const requestSucceededAction = {
        type:    createRequestSucceededActionType(namespace),
        payload: { response: successResponse },
        meta:    {
          namespace,
          requestLifecycleType: REQUEST_SUCCEEDED,
        },
      }

      expect(store.dispatch).toHaveBeenCalledWith(requestSucceededAction)
    })

    it('calls dispatch with a \'requestFailed\' action on failure', async () => {
      try {
        await middleware({
          type: 'type',
          meta: { namespace, request: failingRequest },
        })
      } catch (e) {
        expect(e).toEqual(errorResponse)
      }

      const requestFailedAction = {
        type:    createRequestFailedActionType(namespace),
        payload: { error: errorResponse },
        meta:    {
          namespace,
          requestLifecycleType: REQUEST_FAILED,
        },
      }

      expect(store.dispatch).toHaveBeenCalledWith(requestFailedAction)
    })

    it('applies partial action to dispatched success-action', async () => {
      const partialSuccessAction = {
        meta: {
          foo: 'bar',
        },
      }

      await middleware({
        type: 'type',
        meta: {
          namespace,
          partialSuccessAction,
          request: succeedingRequest,
        },
      })

      expect(store.dispatch.mock.calls[ 0 ][ 0 ].meta.foo).toEqual('bar')
    })

    it('applies partial action to dispatched failure-action', async () => {
      const partialFailureAction = {
        meta: {
          foo: 'bar',
        },
      }
      try {
        await middleware({
          type: 'type',
          meta: {
            namespace,
            partialFailureAction,
            request: failingRequest,
          },
        })
      } catch (e) {
        /* VOID */
      }

      expect(store.dispatch.mock.calls[ 0 ][ 0 ].meta.foo).toEqual('bar')
    })
  })
})
