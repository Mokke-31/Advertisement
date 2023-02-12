import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '@/supabase';

const CreateNewAd = () => {
  
  const [ad_image, setAdImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [formError, setFormError] = useState(null);
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e) => {
      e.preventDefault()

      if (!name || !description || !start_date || !end_date) {
      // if (!ad_iamge || !name || !description || !start_date || !end_date) {

          setFormError("Please fill out all fields correctly")
          return
      }

      const { data, error } = await supabase
        .from('advertisements')
        .insert([{ name, description, start_date, end_date}])

      if (error) {
        console.log(error)
        setFormError("Please fill out all fields correctly")
      }
      if (data) {
        console.log(data)
        setFormError(null)
      }
  }

  // const uploadImage = async (event) => {
  //   try {
  //     setUploading(true)

  //     if (!event.target.files || event.target.files.length === 0) {
  //       throw new Error('You must select an image to upload.')
  //     }

  //     const file = event.target.files[0]
  //     const fileExt = file.name.split('.').pop()
  //     const fileName = `${uid}.${fileExt}`
  //     const filePath = `${fileName}`

  //     let { error: uploadError } = await supabase.storage
  //       .from('images')
  //       .upload(filePath, file, { upsert: true })

  //     if (uploadError) {
  //       throw uploadError
  //     }

  //     onUpload(filePath)
  //   } catch (error) {
  //     alert('Error uploading avatar!')
  //     console.log(error)
  //   } finally {
  //     setUploading(false)
  //   }
  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="ad_image">Advertisement Image </label>
          <input
              type="file"
              id="ad_image"
              value={ad_image}
              onChange={(e) => setAdImage(e.target.value)}
          />   */}
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

        <button>Create Advertisement</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreateNewAd;