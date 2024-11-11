import { createFileRoute } from '@tanstack/react-router'
import Home from '@/pages/Home'

export const Route = createFileRoute('/')({
  component: index,
})

function index() {
  return (
    <Home/>
  )
}
