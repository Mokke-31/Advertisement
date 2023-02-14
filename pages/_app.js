// import '../styles/globals.css'
// import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
// import { SessionContextProvider } from '@supabase/auth-helpers-react'
// import { useState } from 'react'

// function MyApp({ Component, pageProps }) {
//   const [supabase] = useState(() => createBrowserSupabaseClient())

//   return (
//     <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
//       <Component {...pageProps} />
//     </SessionContextProvider>
//   )
// }
// export default MyApp

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}