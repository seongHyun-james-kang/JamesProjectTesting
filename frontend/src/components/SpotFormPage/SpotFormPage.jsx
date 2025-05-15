// Import React and hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import the thunk to create spot
import { createSpot } from '../../store/spots';



function SpotFormPage() {
  const dispatch = useDispatch(); // Access Redux dispatch
  const navigate = useNavigate();
  
  // input state
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Gather form values into one object
    const newSpot = {
      address,
      city,
      state: stateName,
      country,
      name,
      description,
      price
    };

    // Dispatch thunk to send data to backend
    // const result = await dispatch(createSpot(newSpot));
    const createdSpot = await dispatch(createSpot(newSpot));

    // Redirect to detail page of newly created spot
    navigate(`/spots/${createdSpot.id}`);


    // Print result to console for now
    console.log('Created spot:', createdSpot);
  };

  return (
    // Basic form UI
    <form onSubmit={handleSubmit}>
      <h2>Create a New Spot</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
      <input placeholder="State" value={stateName} onChange={(e) => setStateName(e.target.value)} required />
      <input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <button type="submit">Create Spot</button>
    </form>

  );
}

export default SpotFormPage; 
