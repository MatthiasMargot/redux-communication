import createCommunication from './create-communication'

describe('createCommunication()', () => {
  it('returns a [ middleware, reducer ] tuple', () => {
    const communicationTuple = createCommunication()

    expect(communicationTuple).toHaveLength(2)
  })
})
