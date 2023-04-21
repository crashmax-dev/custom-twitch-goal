import { MantineProvider, Stack } from '@mantine/core'

export function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: 'dark' }}
    >
      <Stack
        px="lg"
        w="100%"
      ></Stack>
    </MantineProvider>
  )
}
