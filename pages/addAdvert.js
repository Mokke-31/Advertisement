import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Create from '../components/Create'

const AddAdvertisement = () => {
  // const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div>
      <div>
        <ul>
          <li><a href={'/viewAds'}>Home</a></li>
          <li><a class="active" href={'/addAdvert'}>Add Advertisement</a></li>
          <li><a href={'/'}>Table View</a></li>
        </ul>
      </div>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <Create />
      </div>
    </div>
    
  )
}

export default AddAdvertisement