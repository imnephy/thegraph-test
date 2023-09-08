import { Outlet } from 'react-router-dom'

import { Footer } from './footer'
import { Header } from './header'
import { Main } from './main'

export interface IMainPageLayoutProperties extends React.ComponentProps<'main'> {}

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  )
}
