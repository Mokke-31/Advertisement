import UpdateAd from '@/components/Update'
import { useRouter } from 'next/router'

const updateAdvert = () => {
  const router = useRouter()
  const {id} = router.query
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <UpdateAd id ={id} />
    </div>
  )
}

export default updateAdvert