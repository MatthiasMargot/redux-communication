const createCommunicationSelector =
    namespace =>
      ({ communication }) =>
        communication[ namespace ] || {}

export default createCommunicationSelector
