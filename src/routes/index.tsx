import { lazy, Suspense, type ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/authContext"
import Layout from "../components/Layout"

const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))
const Welcome = lazy(() => import("../pages/Welcome"))
const Post = lazy(() => import("../pages/Post"))
const MyPost = lazy(() => import("../pages/MyPost"))

type RequreAuthTypes = { children: ReactNode, roles?: string[] }

const RequireAuth = ({ children, roles }: RequreAuthTypes) => {

  const { user, loading } = useAuth()

  if (loading) {
    return <div>User Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  console.log(roles)
  console.log(user.roles)

  if (roles && !roles.some((role) => user.roles?.includes(role))) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold md-2">Access denied</h2>
        <p>You do not have permission to view this page</p>
      </div>
    )
  }

  return <>{children}</>
}

// home component eka portected kala

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          /> */}

          <Route element={<RequireAuth><Layout /></RequireAuth>}>
            <Route path="/home" element={<Home />} />
            <Route path="/post" element={<Post />} />
            
            <Route
              path="/mypost"
              element={
                <RequireAuth roles={["ADMIN", "AUTHOR"]}>
                  <MyPost />
                </RequireAuth>
              }
            />
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
