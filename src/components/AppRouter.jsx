import React from 'react'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'
import AppLayout from 'src/components/AppLayout'

import { GradesView } from './Views/GradesView'
import { PresenceView } from './Views/PresenceView'
import { HomeworksView } from './Views/HomeworksView'

const routes = [
  {
    path: 'timetable',
    element: <AppLayout />,
    children: [
      {
        path: ''
      }
    ]
  },
  {
    path: 'homeworks',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <HomeworksView />
      }
    ]
  },
  {
    path: 'grades',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <GradesView />
      }
    ]
  },
  {
    path: 'presence',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <PresenceView />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate replace to="/grades" />
  }
]

const AppRouter = () => {
  const router = createHashRouter(routes)
  return <RouterProvider router={router} />
}

export default AppRouter
