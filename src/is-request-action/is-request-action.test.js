import { isRequestAction, isRequestFailedAction, isRequestSucceededAction } from './is-request-action'
import { REQUEST_FAILED, REQUEST_SUCCEEDED }                                from '../action-types'

const validRequestAction = {
  type: 'ACTION_TYPE',
  meta: {
    request:   jest.fn(),
    namespace: 'namespace',
  },
}

describe('isRequestAction()', () => {
  it('returns false if the action has no meta', () => {
    expect(isRequestAction({})).toBe(false)
  })

  it('returns false if the meta has no request', () => {
    expect(isRequestAction({ meta: {} })).toBe(false)
  })

  it('returns false if the meta has no namespace', () => {
    expect(isRequestAction({ meta: {} })).toBe(false)
  })

  it('returns false if action is not fsa compliant', () => {
    expect(isRequestAction({})).toBe(false)
  })

  it('returns true if the action is a request action', () => {
    expect(isRequestAction(validRequestAction)).toBe(true)
  })
})

describe('isRequestFailedAction()', () => {
  it('returns true if the action has a requestLifecycleType meta of REQUEST_FAILED', () => {
    const action = {
      meta: {
        requestLifecycleType: REQUEST_FAILED,
      },
    }

    expect(isRequestFailedAction(action)).toBe(true)
  })
})

describe('isRequestSucceededAction()', () => {
  it('returns true if the action has a requestLifecycleType meta of REQUEST_SUCCEEDED', () => {
    const action = {
      meta: {
        requestLifecycleType: REQUEST_SUCCEEDED,
      },
    }

    expect(isRequestSucceededAction(action)).toBe(true)
  })
})
