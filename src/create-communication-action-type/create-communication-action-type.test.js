import * as config                              from '../config'
import { REQUESTED }                            from '../action-types'
import { createCommunicationActionTypeCreator } from './create-communication-action-type'

describe('communicationActionTypeCreator())', () => {
  it('returns a function which returns a namespaced communicationActionType', () => {
    const namespace = 'namespace'

    const createRequestedActionTypeCreator = createCommunicationActionTypeCreator(REQUESTED)

    const communicationActionType = createRequestedActionTypeCreator(namespace)

    const expectedCommunicationActionType = `${config.actionTypePrefix} [ ${namespace} ] ${REQUESTED}`

    expect(communicationActionType).toEqual(expectedCommunicationActionType)
  })
})
