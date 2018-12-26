import createCommunicationSelector from './create-communication-selector'

const namespace = 'namespace'

describe('createCommunicationSelector()', () => {
  const communicationSelector = createCommunicationSelector(namespace)

  describe('the created communication selector', () => {
    it('selects the correct communication given the state', () => {
      const communication = {
        fetching: false,
        error:    undefined,
      }

      const state = {
        communication: {
          [ namespace ]: communication,
        },
      }

      expect(communicationSelector(state)).toEqual(communication)
    })

    it('returns an empty object if the required communication hasn\'t been initiated yet', () => {
      const state = { communication: {} }

      expect(communicationSelector(state)).toEqual({})
    })
  })
})
