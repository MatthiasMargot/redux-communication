import createCommunicationReducer from './create-communication-reducer'
import {
  createRequestedActionType,
  createRequestFailedActionType,
  createRequestSucceededActionType,
}                                 from '../create-communication-action-type'

const namespace = 'namespace'

describe('createCommunicationReducer', () => {
  const reducer = createCommunicationReducer()

  describe('the returned communicationReducer', () => {
    it('returns an empty object if no state was passed', () => {
      const action = { type: 'no match' }

      expect(reducer(undefined, action)).toEqual({})
    })

    it('returns the passed state on no action-type match', () => {
      const state = { foo: 'bar' }

      const action = { type: 'no match' }

      expect(reducer(state, action)).toEqual(state)
    })

    it('handles request initiation', () => {
      const action = {
        type: createRequestedActionType(namespace),
        meta: { namespace },
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
        meta:    { namespace },
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
        meta:    { namespace },
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
