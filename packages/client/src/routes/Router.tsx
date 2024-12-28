import React from "react"
import { createBrowserRouter } from "react-router-dom"

const Home = React.lazy(() => import("@/routes/Home"))
const Room = React.lazy(() => import("@/routes/Room"))

const Router = createBrowserRouter([
  {
    path: "/",
    element:
      (<React.Suspense fallback={<div>Loading...</div>}>
        <Home />
      </React.Suspense>),
  },
  {
    path: "/room/:roomId",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Room />
      </React.Suspense>)
    ,
  }
])
export default Router