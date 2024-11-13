import {Outlet, createRootRoute} from "@tanstack/react-router"
import './home.css'

export const Route =  createRootRoute({
    component: RootComponent,
    notFoundComponent: NotFound
})

function RootComponent() {

    return (
        <article className="wrapper">
            <Outlet/>
        </article>
    )
}

function NotFound() {
    return <h1>Not Found</h1>
}