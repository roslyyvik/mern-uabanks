import { Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../context";

const ProtectedRoute = () => {
  const { user } = useGlobalContext()
  if(!user) {
    return <Navigate to={`/login`} />
  }
  return (
    <Outlet />
  )
}

export default ProtectedRoute
