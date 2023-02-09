import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Table from '../components/Table'

const Home = () => {
  // const session = useSession()
  const supabase = useSupabaseClient()

//   return (
//     <div className="container" style={{ padding: '50px 0 100px 0' }}>
//       {!session ? (
//         <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
//       ) : (
//         <Table session={session} />
//       )}
//     </div>
//   )
return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Table />
    </div>
  )
}

export default Home