import createRequest  from './create-request'
import isFsaCompliant from '../is-fsa-compliant/is-fsa-compliant'

const namespace = 'namespace'

describe('createRequest()', () => {
  let request

  beforeEach(() => {
    request = jest.fn()
  })

  it('returns an [ requestActionCreator, requestCommunicationSelector, actionTypes ] tuple', () => {
    expect(createRequest(request, namespace)).toHaveLength(3)
  })

  describe('the returned requestActionCreator', () => {
    it('creates an FSA compliant action', () => {
      const [ actionCreator ] = createRequest(request, namespace)

      expect(isFsaCompliant(actionCreator({}))).toBe(true)
    })
  })

  it('lets you overwrite the used action-types', () => {
    const [ , , actionTypes ] = createRequest(
      request,
      namespace,
      {
        init:    { type: 'requested' },
        failure: { type: 'failed' },
        success: { type: 'succeeded' },
      },
    )

    const {
      requested,
      failed,
      succeeded,
    } = actionTypes

    expect(requested).toBe('requested')
    expect(failed).toBe('failed')
    expect(succeeded).toBe('succeeded')
  })
})
