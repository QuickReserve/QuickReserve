import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Select } from "./pages/Select"
import { ReservationRegistration } from "./pages/ReservationRegistration"
import { RemoveReservation } from "./pages/RemoveReservation"
import { CheckUserReservation } from "./pages/CheckUserReservation"
import { CheckRoomReservation } from "./pages/CheckRoomReservation"
import { CheckReservation } from "./pages/CheckReservation"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Select></Select>,
  },
  {
    path: "/Cadastrar",
    element: <ReservationRegistration></ReservationRegistration>,
  },
  {
    path: "/Remover",
    element: <RemoveReservation></RemoveReservation>,
  },
  {
    path: "/Sala",
    element: <CheckRoomReservation></CheckRoomReservation>,
  },
  {
    path: "/Usuario",
    element: <CheckUserReservation></CheckUserReservation>,
  },
  {
    path: "/Reserva",
    element: <CheckReservation></CheckReservation>,
  },
])

function App() {


  return (
    <RouterProvider router={routes} />
  )
}



export default App
