import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from './Image';

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [image_url, setImageUrl] = useState(null)
  const [start_date, setStartDate] = useState(null)
  const [end_date, setEndDate] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('advertisements')
        .select(`name, description, image_url, start_date, end_date`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setName(data.name)
        setDescription(data.description)
        setImageUrl(data.image_url)
        setStartDate(data.start_date)
        setEndDate(data.end_date)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ name, description, image_url, start_date, end_date }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        name,
        description,
        image_url,
        start_date,
        end_date,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('advertisements').upsert(updates)
      if (error) throw error
      alert('Advertisement updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <Image
        uid={user.id}
        url={image_url}
        size={150}
        onUpload={(url) => {
            setImageUrl(url)
            updateProfile({ name, description, image_url: url, start_date, end_date })
        }}
      />
      <div>
        <label htmlFor="name">Advertisement Name</label>
        <input
          id="name"
          type="text"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Advertisement Description</label>
        <input
          id="description"
          type="text"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="startDate">Start Date</label>
          <input
          id="startDate"
          type="date"
          value={start_date || ''}
          onChange={(e) => setStartDate(e.target.value)}
          required
          />
      </div>
      <div>
        <label htmlFor="endDate">End Date</label>
          <input
          id="endDate"
          type="date"
          value={end_date || ''}
          onChange={(e) => setEndDate(e.target.value)}
          required
          />
      </div>
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ name, description, image_url, start_date, end_date })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      {/* <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div> */}
    </div>
  )
}