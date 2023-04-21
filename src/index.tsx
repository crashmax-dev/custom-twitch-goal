import { createRoot } from 'react-dom/client'
import { App } from './App'

const root = document.querySelector<HTMLElement>('#root')!
createRoot(root).render(<App />)
