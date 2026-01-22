import { lazy, Suspense } from 'preact/compat'

const ProfileInfo = lazy(() => import('./components/ProfileInfo'))

import UtilsProvider from '@context/Utils'
import EnterAnimation from '@src/EnterAnimation'

export default function Home() {
  return (
    <UtilsProvider>
      <EnterAnimation
        render={
          /** @param {DOMRect} docRect */ docRect => (
            <Suspense fallback={null}>
              <ProfileInfo rect={docRect} />
            </Suspense>
          )
        }
      />
    </UtilsProvider>
  )
}
