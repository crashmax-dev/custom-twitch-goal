import { createRoot } from 'react-dom/client'
import { App } from './app'
import './style.css'
import { MantineProvider } from '@mantine/core'

const root = document.querySelector<HTMLElement>('#root')!
createRoot(root).render(
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{ colorScheme: 'dark' }}
  >
    <App />
  </MantineProvider>
)
