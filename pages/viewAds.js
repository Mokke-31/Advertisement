import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react';

// components
import AdvertCard from '../components/AdvertCard'

const viewAds = () => {
  const [fetchError, setFetchError] = useState(null)
  const [advertisements, setAdvertisements] = useState(null)

  const handleDelete = (id) => {
    setAdvertisements(prevAdverts => {
      return prevAdverts.filter(advert => advert.id !== id)
    })
  }

  useEffect(() => {
    const fetchAdvertisements = async () => {
      const { data, error } = await supabase
        .from('advertisements')
        .select()
      
      if (error) {
        console.log(data)
        setFetchError('Could not fetch Advertisements')
        setAdvertisements(null)
      }
      if (data) {
        setAdvertisements(data)
        setFetchError(null)
      }
    }

    fetchAdvertisements()

  }, [])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {advertisements && (
        <div className="advertisements">
          {/* order-by buttons */}
          <div className="advert-grid">
            {advertisements.map(advert => (
              <AdvertCard 
                key={advert.id} 
                advert={advert} 
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default viewAds