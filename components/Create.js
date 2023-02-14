// import { useQueryClient } from 'react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from "../config/supabaseClient";
import Link from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CreateNewAd = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [formError, setFormError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [image_url, setImageUrl] = useState(null)

  const uploadImage = (e) => {
    setImageUrl(e.target.files[0]) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !description || !start_date || !end_date) {
      setFormError("Please fill out all fields correctly")
      return
    } 
      // alert("Advertisement record created successfully!");
      // confirm("Click Ok to return to home view");
      // window.location = '/viewAds';
    

    const { data, error, status } = await supabase
      .from('advertisements')
      .insert([{ name, description, start_date, end_date}])
      .select('id')

      const newUUID = crypto.randomUUID();
      await supabase.storage.from('images').upload(`${newUUID}`, image_url);
      const { error: message } = await supabase
        .from('advertisements')
        .update({ image_url: newUUID })
        .eq('id', data[0].id);
      setImageUrl(null);

    if (error) {
      console.log(error)
      setFormError("Please fill out all fields correctly")
    }
    if (data) {
      console.log(data)
      alert("Advertisement record created successfully!");
      confirm("Click Ok to return to home view");
      window.location = '/viewAds';
      setFormError(null)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <Link href={'/viewAds'}>
        <ArrowBackIosIcon>Back</ArrowBackIosIcon>
      </Link>
        
        <label htmlFor="name">Name: </label>
        <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />   
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="startDate">Start Date: </label>
          <input
            type="date"
            id="start_date"
            value={start_date}
            onChange={(e) => setStartDate(e.target.value)}
          />
        <label htmlFor="endDate">Name: </label>
        <input
            type="date"
            id="end_date"
            value={end_date}
            onChange={(e) => setEndDate(e.target.value)}
        />
        <label htmlFor="imageUpload">Add advertisement image here: </label>
        <div>
          {image_url ? (
            <img
              src={image_url}
              alt="Image"
              className="image upload"
              
            />
          ) : (
            <div className="image no-image" />
          )}
          <div >
            <label className="image-button" htmlFor="single">
              {uploading ? 'Uploading ...' : 'Upload'}
            </label>
            <input
              style={{
                visibility: 'hidden',
                position: 'absolute',
              }}
              type="file"
              id="single"
              accept="image/*"
              onChange={(e) => uploadImage(e)}
              disabled={uploading}
            />
          </div>
        </div>

        <button>Create Advertisement</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreateNewAd;