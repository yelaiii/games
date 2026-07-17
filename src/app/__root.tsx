import type { QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import { I18nProvider } from '@kanjou/react'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { getLocale } from './-utils/locale'

import localeLoaders from 'virtual:kanjou/modules'
import 'virtual:uno.css'

import '#/assets/styles/global.css'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Games' },
    ],
  }),
  loader: async () => {
    const locale = await getLocale()
    const { default: messages } = await localeLoaders[locale]()
    return { locale, messages }
  },
  shellComponent: Root,
})

function Root({ children }: { children: ReactNode }) {
  const { locale, messages } = Route.useLoaderData()

  return (
    <html lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <I18nProvider locale={locale} messages={messages}>
          {children}
        </I18nProvider>
        <TanStackDevtools
          plugins={[
            { name: 'TanStack Query', render: <ReactQueryDevtoolsPanel /> },
            { name: 'TanStack Router', render: <TanStackRouterDevtoolsPanel /> },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
