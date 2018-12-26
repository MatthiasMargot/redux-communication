import isFsaCompliant from './is-fsa-compliant'

const fsaCompliant = {
  type:    'TYPE',
  payload: {},
  meta:    {},
  error:   true,
}

describe('isFsaCompliant', () => {
  it('returns false if the type prop is not a string', () => {
    const test = isFsaCompliant({
      ...fsaCompliant,
      type: undefined,
    })

    expect(test).toBe(false)
  })

  it('returns false is the error prop is not of boolean type', () => {
    const test = isFsaCompliant({
      ...fsaCompliant,
      error: 'notABoolean',
    })

    expect(test).toBe(false)
  })

  it('returns false if the \'payload\' prop exists but is not of type object', () => {
    const test = isFsaCompliant({
      ...fsaCompliant,
      payload: 'notAnObject',
    })

    expect(test).toBe(false)
  })

  it('returns false if the \'meta\' prop expists but is not of type object', () => {
    const test = isFsaCompliant({
      ...fsaCompliant,
      meta: 'notAnObject',
    })

    expect(test).toBe(false)
  })

  it('returns true if the action is fsa compliant', () => {
    const test = isFsaCompliant(fsaCompliant)

    expect(test).toBe(true)
  })
})
