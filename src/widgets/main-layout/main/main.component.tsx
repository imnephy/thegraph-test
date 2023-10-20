import { IconComponent } from '@shared/ui/icon'
import { Suspense } from 'react'

export interface IMainProperties extends React.ComponentProps<'main'> {}
export function Main(props: IMainProperties) {
  return (
    <main {...props}>
      <Suspense>
        <IconComponent name="unistory" style={{ width: '50vw' }} />
      </Suspense>
      {props.children}
    </main>
  )
}
