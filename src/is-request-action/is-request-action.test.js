import isRequestAction from './is-request-action'

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
