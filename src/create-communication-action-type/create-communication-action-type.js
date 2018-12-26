import * as config                                      from '../config'
import { REQUESTED, REQUEST_FAILED, REQUEST_SUCCEEDED } from '../action-types'

export const createCommunicationActionTypeCreator =
  requestActionType =>
    namespace =>
      `${config.actionTypePrefix} [ ${namespace} ] ${requestActionType}`

export const createRequestedActionType =
  createCommunicationActionTypeCreator(REQUESTED)

export const createRequestSucceededActionType =
  createCommunicationActionTypeCreator(REQUEST_SUCCEEDED)

export const createRequestFailedActionType =
  createCommunicationActionTypeCreator(REQUEST_FAILED)
