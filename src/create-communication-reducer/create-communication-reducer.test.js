import createCommunicationReducer                       from './create-communication-reducer'
import {
  createRequestedActionType,
  createRequestFailedActionType,
  createRequestSucceededActionType,
}                                                       from '../create-communication-action-type'
import { REQUEST_FAILED, REQUEST_SUCCEEDED, REQUESTED } from '../action-types'

const namespace = 'namespace'

describe('createCommunicationReducer', () => {
  const reducer = createCommunicationReducer()

  describe('the returned communicationReducer', () => {
    it('returns an empty object if no state was passed', () => {
      const action = {}

      expect(reducer(undefined, action)).toEqual({})
    })

    it('returns the passed state if the coming through action is not a request-action', () => {
      const state = { foo: 'bar' }

      const action = {}

      expect(reducer(state, action)).toEqual(state)
    })

    it('handles request initiation', () => {
      const action = {
        type: createRequestedActionType(namespace),
        meta: {
          namespace,
          requestLifecycleType: REQUESTED,
        },
      }

      const initial = {
        [ namespace ]: {
          fetching: false,
          error:    'error',
        },
      }

      const expectedState = {
        [ namespace ]: {
          fetching: true,
          error:    undefined,
        },
      }

      expect(reducer(initial, action)).toEqual(expectedState)
    })

    it('handles request success', () => {
      const response = 'response'

      const initial = {
        [ namespace ]: {
          fetching: true,
          error:    undefined,
        },
      }

      const action = {
        type:    createRequestSucceededActionType(namespace),
        payload: { response },
        meta:    {
          namespace,
          requestLifecycleType: REQUEST_SUCCEEDED,
        },
      }

      const expectedState = {
        [ namespace ]: {
          response,
          fetching: false,
          error:    undefined,
        },
      }

      expect(reducer(initial, action)).toEqual(expectedState)
    })

    it('handles request failure', () => {
      const error = 'error'

      const initial = {
        [ namespace ]: {
          fetching: true,
          error:    undefined,
        },
      }

      const action = {
        type:    createRequestFailedActionType(namespace),
        payload: { error },
        meta:    {
          namespace,
          requestLifecycleType: REQUEST_FAILED,
        },
      }

      const expectedState = {
        [ namespace ]: {
          error,
          fetching: false,
        },
      }

      expect(reducer(initial, action)).toEqual(expectedState)
    })
  })
})
