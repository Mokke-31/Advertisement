import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import supabase from "../config/supabaseClient";

const UpdateAd = ({id}) => {
  // const { id } = params;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !description || !start_date || !end_date || !end_date) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('advertisements')
      .update({ name, description, start_date, end_date })
      .eq('id', id)

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
      }
    }

    fetchAdvertisements()
  }, [id])

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="name">Image </label>
          <input 
            type="file" 
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> */}
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