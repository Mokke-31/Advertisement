import supabase from '../config/supabaseClient';

import { useState, useEffect } from "react";
import Link from "next/link"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CDNURL = "https://ulefnqafgjbxykfehntu.supabase.co/storage/v1/object/public/images/"

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
        <img className="image-view" src={CDNURL + advert.image_url} />
        <p>Title: </p>
        <h3>{advert.name}</h3>
        <p>Description: </p>
        <p>{advert.description}</p>
        <p>Start Date: </p>
        <p>{advert.start_date}</p>
        <p>End Date: </p>
        <p>{advert.end_date}</p>
        <div className="buttons">
            <Link href={'/update/' + advert.id} key={advert.id} id={advert.id}>
              <EditIcon>edit</EditIcon>
            </Link>
            <DeleteIcon onClick={handleDelete}>delete</DeleteIcon>
        </div>
      </div>
    )
  }
  
  export default AdvertCard