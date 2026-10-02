import { useNavigation } from '@hooks/useNavigation'
import { lazy, Suspense } from 'preact/compat'

import EnterAnimation from './EnterAnimation'

const ProfileInfo = lazy(() => import('./components/ProfileInfo'))
const Projects = lazy(() => import('./components/Projects'))
const Drawer = lazy(() => import('./components/Drawer'))
const SettingsButton = lazy(() => import('./components/SettingButton'))
const NavigationControls = lazy(() => import('./components/NavigationControls'))
const Contact = lazy(() => import('./components/Contact'))

import cn from './utils/cn'

export default function App() {
  const { containerRef } = useNavigation()

  const sectionClass = 'w-full h-full flex-shrink-0 snap-start overflow-y-auto p-8 overflow-y-hidden'

  return (
    <EnterAnimation>
      <div className='relative w-full h-screen overflow-hidden'>
        <Suspense fallback={null}>
          <Drawer />
        </Suspense>

        <main
          ref={containerRef}
          className='flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar max-w-[1200px]'
        >
          <section id='hero' className={sectionClass}>
            <Suspense fallback={null}>
              <ProfileInfo />
            </Suspense>
          </section>

          <section id='projects' className={cn(sectionClass, 'overflow-y-auto')}>
            <Suspense fallback={null}>
              <Projects />
            </Suspense>
          </section>

          <section id='contact' className={sectionClass}>
            <Suspense fallback={null}>
              <Contact />
            </Suspense>
          </section>
        </main>

        <Suspense fallback={null}>
          <NavigationControls />
          <SettingsButton />
        </Suspense>
      </div>
    </EnterAnimation>
  )
}
