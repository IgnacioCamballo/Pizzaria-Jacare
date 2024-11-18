import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import './index.css'
import { MenuProvider } from './context/MenuProvider.jsx'
import Router from './router.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MenuProvider>
        <Router />
        <ReactQueryDevtools />
      </MenuProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
