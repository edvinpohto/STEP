import { useState } from "react";

const useInput = (initialValue: any) => {
  const access_token = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN
  const [value, setvalue] = useState(initialValue);
  const [suggestions, setsuggestions] = useState([]);

  const handleChange = async (event: { target: { value: string }; }) => {
    setvalue(event.target.value);

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${access_token}&autocomplete=true`;
      const response = await fetch(endpoint);
      const results = await response.json();
      setsuggestions(results?.features);
    } catch (error) {
      console.log("Error fetching data, ", error);
    }
  };

  console.log(value)

  return {
    value,
	  onChange: handleChange,
	  setvalue,
    suggestions,
    setsuggestions
  };
};

export default useInput;