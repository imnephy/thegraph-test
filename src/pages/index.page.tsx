import { Meta } from '@shared/meta'
import { Image } from '@shared/ui/image'

export const HomePage = () => {
  return (
    <>
      <Meta description="Unistory next" title="Unistory" />
      <h1>🦄⚡ Unistory vite template</h1>
      <h2>{process.env.VITE_APP_URL || null}</h2>
      <Image
        alt=""
        style={{
          width: '40rem',
        }}
        responsive
        src="/assets/random/random.jpg"
        loading="lazy"
      />
    </>
  )
}
