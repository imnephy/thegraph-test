/* eslint-disable import/extensions */
import { ROUTES } from '@shared/lib/constants'
import { MainLayout } from '@widgets/main-layout'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

export const routes = createRoutesFromElements(
  <Route>
    <Route Component={MainLayout}>
      <Route
        path="*"
        lazy={async () => {
          const { NotFoundPage } = await import('@pages/404/index.page')
          return {
            Component: NotFoundPage,
          }
        }}
      />
      <Route
        path={ROUTES.HOME}
        lazy={async () => {
          const { HomePage } = await import('@pages/index.page')
          return {
            Component: HomePage,
          }
        }}
      />
    </Route>
  </Route>,
)

export const router = createBrowserRouter(routes)
