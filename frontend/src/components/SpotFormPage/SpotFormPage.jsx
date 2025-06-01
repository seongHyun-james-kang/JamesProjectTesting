// Import React and hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './SpotFormPage.css'
// import the thunk to create spot
import { createSpot, getSpotById } from '../../store/spots';
import { csrfFetch } from '../../store/csrf';


function SpotFormPage() {
  const dispatch = useDispatch(); // Access Redux dispatch
  const navigate = useNavigate();
  const { spotId } = useParams(); // needed for edit spot
  const isEditing = !!spotId;// needed for edit spot
  const spot = useSelector(state => state.spots[spotId]); //needed for edit spot
  
  // input state

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
 const [errors, setErrors] = useState([]);
 const [imageUrl2, setImageUrl2] = useState('');
 const [imageUrl3, setImageUrl3] = useState('');
 const [imageUrl4, setImageUrl4] = useState('');
 const [imageUrl5, setImageUrl5] = useState('');


 useEffect(() => {
    if (isEditing) dispatch(getSpotById(spotId));
  }, [dispatch, isEditing, spotId]);

  useEffect(() => {
    if (isEditing && spot) {
      setAddress(spot.address);
      setCity(spot.city);
      setStateName(spot.state);
      setCountry(spot.country);
      setLat(spot.lat);
      setLng(spot.lng);
      setName(spot.name);
      setDescription(spot.description);
      setPrice(spot.price);
    }
  }, [isEditing, spot]);


  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const validationErrors =[];

    if (description.length < 30) {
        validationErrors.push("Description must be at least 30 characters");
      }
      if (!imageUrl.match(/\.(png|jpg|jpeg)$/)) {
        validationErrors.push("Image URL must end in .png, .jpg, or .jpeg");
      }
      if (validationErrors.length) {
        setErrors(validationErrors);
        return;
      }

    // Gather form values into one object
    const newSpot = {
      address,
      city,
      state: stateName,
      country,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      name,
      description,
      price: parseFloat(price)
    };

    // Dispatch thunk to send data to backend
    // const result = await dispatch(createSpot(newSpot));
    try {
        let createdSpot;
        if (isEditing) {
          createdSpot = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSpot)
          }).then(res => res.json());
      } else {
        createdSpot = await dispatch(createSpot(newSpot));
    // once the spot is created, add the image
    await csrfFetch(`/api/spots/${createdSpot.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: imageUrl,
          preview: true
        })
      });

      //add optional images
      const imageUrls = [imageUrl2, imageUrl3, imageUrl4, imageUrl5];

    for (let url of imageUrls) {
    if (url && url.match(/\.(png|jpg|jpeg)$/)) {
        await csrfFetch(`/api/spots/${createdSpot.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url,
            preview: false
            })
        });
        }
    }
      }
    // Redirect to detail page of newly created spot
    navigate(`/spots/${createdSpot.id}`);
//    Print result to console for now
    console.log('Created spot:', createdSpot);

  } catch (err) {
    const data = await err.json();
    if (data && data.errors) setErrors(Object.values(data.errors));
  }
};


  return (
    // Basic form UI
    <form onSubmit={handleSubmit} className="create-spot-form">
      <h2>Create a New Spot</h2>
      {/*Display errors */}
      {errors.length > 0 && (
        <ul>
          {errors.map((error, i) => (
            <li key={i} style={{ color: 'red' }}>{error}</li>
          ))}
        </ul>
      )}

      <h3>Where&apos;s your place located?</h3>
      <p>Guests will only get your exact address once they book.</p>
      <input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
      <input placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
      <input placeholder="State" value={stateName} onChange={(e) => setStateName(e.target.value)} required />
      <input placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} required />
      <input placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} required />
      
      <h3>Describe your place to guests</h3>
      <p>Mention the best features of your space, amenities, and neighborhood.</p>
      <textarea placeholder="Please write at least 30 characters" value={description} onChange={e => setDescription(e.target.value)} required />

      <h3>Create a title for your spot</h3>
      <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
      <input placeholder="Name of your spot" value={name} onChange={e => setName(e.target.value)} required />
      
      <h3>Set a base price for your spot</h3>
      <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>     
      <input 
        type="number" 
        placeholder="Price" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        required 
       />
            {!isEditing && (
        <>
      <h3>Add a preview image URL</h3>
      <p>Submit a link to at least one photo to publish your spot.</p>
      
      <input placeholder="Preview Image URL" 
      value={imageUrl} 
      onChange={e => setImageUrl(e.target.value)} 
      required 
      />
      
      <input 
        placeholder="Image URL 2 (optional)" 
        value={imageUrl2} 
        onChange={e => setImageUrl2(e.target.value)} 
        
      />
      <input 
        placeholder="Image URL 3 (optional)" 
        value={imageUrl3} 
        onChange={e => setImageUrl3(e.target.value)} 
       
      />
      <input 
        placeholder="Image URL 4 (optional)" 
        value={imageUrl4} 
        onChange={e => setImageUrl4(e.target.value)} 
        
      />
      <input 
        placeholder="Image URL 5 (optional)" 
        value={imageUrl5} 
        onChange={e => setImageUrl5(e.target.value)} 
      />
      </>
    )}     
      {isEditing && <button type="submit">Update Spot</button>}
    {!isEditing && <button type="submit">Create Spot</button>}
    </form>
  );
}

export default SpotFormPage; 
