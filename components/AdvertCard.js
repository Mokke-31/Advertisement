import supabase from '../config/supabaseClient';

import { useState, useEffect } from "react";
import Link from "next/link"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Delete from '@mui/icons-material/Delete';


// export const getStaticProps = async () => {
//   const res = await fetch()
//   const data = await res.json();

//   return {
//       props: { adverts: data }
//   }
// }

const AdvertCard = ({ advert, onDelete }) => {
  const [advertisements, setAdvertisements] = useState(null)
  const [fetchError, setFetchError] = useState(null)

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('advertisements')
      .delete()
      .eq('id', advert.id)

    if (error) {
      console.log(error)
    }

    if (data) {
      console.log(data)
      onDelete(advert.id)
    }
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
      <div className="advert-card">
        <h3>{advert.name}</h3>
        <p>{advert.description}</p>
        <p>{advert.start_date}</p>
        <p>{advert.end_date}</p>
        <div className="buttons">
          {/* {advertisements.map(advert => (
            <Link href={'/update/' + advert.id} key={advert.id}>
              <EditIcon>edit</EditIcon>
            </Link>
          ))} */}
            <Link href={'/update/' + advert.id} key={advert.id} id={advert.id}>
              <EditIcon>edit</EditIcon>
            </Link>
            <DeleteIcon onClick={handleDelete}>delete</DeleteIcon>
        </div>
      </div>
    )
  }
  
  export default AdvertCard