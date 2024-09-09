import React from 'react'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'
import AppLayout from 'src/components/AppLayout'

import { GradeModal } from './Dialogs/GradesModal'
import { HomeworkModal } from './Dialogs/HomeworkModal'
import { TimetableModal } from './Dialogs/TimetableModal'
import { GradesView } from './Views/GradesView'
import { HomeworksView } from './Views/HomeworksView'
import { PresenceView } from './Views/PresenceView'
import { TimetableView } from './Views/TimetableView'

const routes = [
  {
    path: '',
    element: <AppLayout />,
    children: [
      {
        path: 'timetable',
        element: <TimetableView />,
        children: [
          {
            path: 'course/:courseId',
            element: <TimetableModal />
          }
        ]
      },
      {
        path: 'homeworks',
        element: <HomeworksView />,
        children: [
          {
            path: 'homework/:homeworkId',
            element: <HomeworkModal />
          }
        ]
      },
      {
        path: 'grades',
        element: <GradesView />,
        children: [
          {
            path: 'grade/:subjectId/:gradeId',
            element: <GradeModal />
          }
        ]
      },
      {
        path: 'presence',
        element: <PresenceView />
      },
      {
        path: '',
        element: <Navigate replace to="/timetable" />
      }
    ]
  }
]

const AppRouter = () => {
  const router = createHashRouter(routes)
  return <RouterProvider router={router} />
}

export default AppRouter
