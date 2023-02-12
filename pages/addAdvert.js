import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Create from '../components/Create'

const AddAdvertisement = () => {
  // const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {/* <Insert /> */}
      <Create />
    </div>
  )
}

export default AddAdvertisement