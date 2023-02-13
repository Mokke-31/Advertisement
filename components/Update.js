import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const UpdateAd = ({id}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [formError, setFormError] = useState(null);
  const [image_url, setImageUrl] = useState(null)
  const [uploading, setUploading] = useState(false);

  const uploadImage = (e) => {
    setImageUrl(e.target.files[0]) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !description || !start_date || !end_date || !image_url) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('advertisements')
      .update({ name, description, start_date, end_date, image_url })
      .eq('id', id)

    const newUUID = crypto.randomUUID();
    await supabase.storage.from('images').upload(`${newUUID}`, image_url);
    const { error: message } = await supabase
      .from('advertisements')
      .update({ image_url: newUUID })
      .eq('id', id);
    setImageUrl(null);

    if (error) {
      setFormError('Please fill in all the fields correctly.')
    }
    if (data) {
      setFormError(null)
    }
  }

  useEffect(() => {
    const fetchAdvertisements = async () => {

      const { data, error } = await supabase
        .from('advertisements')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        console.log("gg go next")
      }

      if (data) {
        console.log(data)
        setName(data.name)
        setDescription(data.description)
        setStartDate(data.start_date)
        setEndDate(data.end_date)
        setImageUrl(data.image_url)
      }
    }

    fetchAdvertisements()
  }, [id])

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
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
            <label className="button primary block" htmlFor="single">
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
        <label htmlFor="name">Name: </label>
        <input 
          type="text" 
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea 
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="start_date">Start Date:</label>
        <input 
          type="date"
          id="start_date"
          value={start_date}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="start_date">End Date:</label>
        <input 
          type="date"
          id="end_date"
          value={end_date}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button>Update Advertisement Details</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default UpdateAd