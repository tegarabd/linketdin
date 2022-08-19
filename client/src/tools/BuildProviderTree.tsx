import React from 'react'

function BuildProviderTree(providers: Array<any>): any {
  if (providers.length === 1) {
    return providers[0]
  }

  const A = providers.shift()
  const B = providers.shift()

  return BuildProviderTree([
    ({children}: {children: React.ReactNode}) => (
      <A>
        <B>
          {children}
        </B>
      </A>
    ),
    ...providers
  ])
}

export default BuildProviderTree