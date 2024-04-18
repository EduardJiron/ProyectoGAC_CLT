import {createRoot} from 'react-dom/client'
import {createBrowserRouter,RouterProvider,Route, BrowserRouter} from 'react-router-dom'
import './components/app.css'
const app=createRoot(document.getElementById('root'))
import { Carrera } from './routes/carrera' 
import { PeriodoAcademico } from './routes/periodoAcademico'
import { Facultad } from './routes/facultad'

const router = createBrowserRouter([
    {
      path: "/carrera",
      element: <Carrera name={'Carrera'} />,
    },
    {
      path: "/facultad",
      element: <Facultad name={'Facultad'} />,
    },
    {
      path: "/periodo_academico",
      element: <PeriodoAcademico name={'Periodo Academico'} />,
    },
  ]);

app.render(
<>
<RouterProvider router={router}/>
</>
)