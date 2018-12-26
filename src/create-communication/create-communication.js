import createCommunicationReducer    from '../create-communication-reducer'
import createCommunicationMiddleware from '../create-communication-middleware'

const createCommunication = () => {
  const middleware = createCommunicationMiddleware()

  const reducer = createCommunicationReducer()

  return [ middleware, reducer ]
}

export default createCommunication
