import { IconComponent } from '@shared/ui/icon'

export interface IMainProperties extends React.ComponentProps<'main'> {}
export function Main(props: IMainProperties) {
  return (
    <main {...props}>
      <IconComponent name="unistory" style={{ width: '50vw' }} />
      {props.children}
    </main>
  )
}
