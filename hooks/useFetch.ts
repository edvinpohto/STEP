// Custom hook for searching for an event

// Guide to building search hook here: https://dev.to/franciscomendes10866/how-to-create-a-search-bar-in-react-58nj

import { useState, useEffect } from "react";
import axios from "axios";

const BaseUrl = axios.create({
  baseURL: "http://step-lime.vercel.app/",
});

const useFetch = () => {
  const [data, setData]: any = useState({
    slug: "",
    results: {
      events: [],
    },
  });

  useEffect(() => {
    if (data.slug !== "") {
      const timeoutId = setTimeout(() => {
        const fetch = async () => {
          try {
            // console.log("From useFetch", data.slug)
            const res = await BaseUrl.get(`api/search/${data.slug}`);
            // console.log("Res from useFetch", res)
            setData({ ...data, results: res.data });
          } catch (err) {
            console.log(err);
          }
        };
        fetch();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [data.slug]);

  return { data, setData };
};

export default useFetch;