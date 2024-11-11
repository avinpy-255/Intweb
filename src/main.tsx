import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import {routeTree} from './routeTree.gen.ts'
import './index.css'
// import App from './App.tsx'

const router = createRouter({ routeTree })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
