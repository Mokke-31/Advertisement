import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react';

// components
import AdvertCard from '../components/AdvertCard'

const viewAds = () => {
  const [fetchError, setFetchError] = useState(null)
  const [advertisements, setAdvertisements] = useState(null)

  const handleDelete = (id) => {
    setAdvertisements(prevAdverts => {
      alert("Advertisement record deleted successfully!");
      // confirm("Click Ok to return to home view");
      // window.location = '/viewAds';
      // return prevAdverts.filter(advert => advert.id !== id)
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
        console.log(data)
      }
    }

    fetchAdvertisements()

  }, [])

  return (
    // <div className="page home">
    <div>
      <div>
        <ul>
          <li><a class="active" href={'/viewAds'}>Home</a></li>
          <li><a href={'/addAdvert'}>Add Advertisement</a></li>
          <li><a href={'/viewTable'}>Table View</a></li>
        </ul>
      </div>
      <div>
        {fetchError && (<p>{fetchError}</p>)}
        {advertisements && (
          <div className="advertisements">
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
      
    </div>
  )
}

export default viewAds