import overwriteDeep from './overwrite-deep'

describe('overwriteDeep', () => {
  it('recursively overwrites an object, while keeping not specified properties intact', () => {
    const initialObject = {
      foo:  'bar',
      baz:  'qux',
      quux: {
        corge:  'uier',
        grault: 'garply',
      },
    }

    const overwrite = {
      foo:  'baz',
      quux: {
        corge: 'grault',
        waldo: 'fred',
      },
    }

    const expected = {
      foo:  'baz',
      baz:  'qux',
      quux: {
        corge:  'grault',
        grault: 'garply',
        waldo:  'fred',
      },
    }

    expect(overwriteDeep(initialObject, overwrite)).toEqual(expected)
  })
})
