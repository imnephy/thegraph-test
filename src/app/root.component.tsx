import '@shared/styles/global.css'

import type { ComponentType } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { cacheExchange, Client, fetchExchange, Provider } from 'urql'

import { ComposeProviders } from './lib'

const container = document.querySelector('#root') as HTMLElement
const root = createRoot(container)

const QUERY_URL = 'https://api.studio.thegraph.com/query/59757/test-nft/version/latest'

const client = new Client({
  url: QUERY_URL,
  exchanges: [cacheExchange, fetchExchange],
})

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <ComposeProviders>
        <Provider value={client}>
          <App />
        </Provider>
      </ComposeProviders>
    </StrictMode>,
  )
}

export default render
