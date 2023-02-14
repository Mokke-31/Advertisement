import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Table from '../components/Table';

const Home = () => {
  // const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div>
      <div>
        <ul>
          <li><a href={'/viewAds'}>Home</a></li>
          <li><a href={'/addAdvert'}>Add Advertisement</a></li>
          <li><a class="active" href={'/'}>Table View</a></li>
        </ul>
      </div>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        <Table />
      </div>
    </div>
  )
}

export default Home