export interface IHeaderProperties extends React.ComponentProps<'header'> {}

export const Header = (props: IHeaderProperties) => {
  return <header {...props} />
}
