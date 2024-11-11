import {Outlet, createRootRoute} from "@tanstack/react-router"

export const Route =  createRootRoute({
    component: RootComponent,
    notFoundComponent: NotFound
})

function RootComponent() {
    return <Outlet/>
}

function NotFound() {
    return <h1>Not Found</h1>
}