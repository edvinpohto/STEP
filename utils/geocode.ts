// a util function as guided by react-geocode to set up a geocoder from coordinates
// gets coordinates from address

// This works locally
const api_key = process.env.NEXT_PUBLIC_KEY as string

import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(api_key);

// set response language. Defaults to english.
Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("uk");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

export default async function addressToCoordinates(address: string) {
  // Get latitude & longitude from address.
  try {
    const res = await Geocode.fromAddress(address)
    const { lat, lng } = res.results[0].geometry.location;
    let coordinates = {
      lat: lat,
      lng: lng
    }
    return coordinates
  } 
  catch (error: any) {
    console.error(error);
  }
}