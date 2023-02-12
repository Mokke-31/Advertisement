import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import EditAd from '../components/EditAd'
import Update from '../components/Update'

const Home = () => {
  // const session = useSession()
  // const supabase = useSupabaseClient()

  // return (
  //   <div className="container" style={{ padding: '50px 0 100px 0' }}>
  //     {!session ? (
  //       <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
  //     ) : (
  //       <NewAd session={session} />
  //     )}
  //   </div>
  // )

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {/* <EditAd /> */}
      <Update />
    </div>
  )
}

export default Home