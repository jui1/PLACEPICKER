import { useRef, useState,useEffect } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from './loc.js'




function App() {
const [modelIsopem ,setModelopem] = useState(false)
  const selectedPlace = useRef();
  const [Available ,setAvailable] =useState([])
  const [pickedPlaces, setPickedPlaces] = useState([]);


  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    const storedPlaces = storedIds.map(id => AVAILABLE_PLACES.find(place => place.id === id))
    setPickedPlaces(storedPlaces);
  }, []);
  

  

useEffect(()=>{
  navigator.geolocation.getCurrentPosition((position)=>{
    const sortedplaced= 
    sortPlacesByDistance(AVAILABLE_PLACES,
     position.coords.latitude,
     position.coords.longitude)
   })
  
},[])


  function handleStartRemovePlace(id) {
    setModelopem(true)
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModelopem(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
  }




  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModelopem(false);
    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    localStorage.setItem('selectedPlaces', JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)));
  }
  
  
  

  return (
    <>
      <Modal  open ={modelIsopem}>
      {modelIsopem && <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />}
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          fallbackText="Sorting Places by istance"
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
