import createAction   from './create-action'
import isFsaCompliant from '../is-fsa-compliant'

describe('createAction()', () => {
  it('maps argument order to object properties of an FSA compliant action', () => {
    const type = 'TYPE'
    const payload = {}
    const meta = {}
    const error = false

    const action = createAction(
      type,
      payload,
      meta,
      error,
    )

    const expectedAction = {
      type,
      payload,
      meta,
      error,
    }

    expect(action).toEqual(expectedAction)
    expect(isFsaCompliant(action)).toBe(true)
  })

  it('creates FSA compliant defaults for \'payload\' \'meta\' and \'error\'', () => {
    const type = 'TYPE'

    const action = createAction(type)

    expect(isFsaCompliant(action)).toEqual(true)
  })
})
