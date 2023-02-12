import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Table from '../components/Table'
import Link from 'next/link';

const Home = () => {
  // const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Table />
      <button>
        <Link
          href={`/addAdvert`}
        >
          Add new Advertisement
        </Link>
    </button>
    </div>
  )
}

export default Home