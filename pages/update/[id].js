import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import UpdateAd from '@/components/Update'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  const {id} = router.query
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <UpdateAd id ={id} />
    </div>
  )
}

export default Home