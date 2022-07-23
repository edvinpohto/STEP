// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";

// const BaseUrl = axios.create({
//   baseURL: "http://localhost:3000/api/event",
// });

// const useGetEvent = () => {
//   const [data, setData]: any = useState({
//     // slug: "",
//     results: {
//       // events: [],
//     },
//   });

//   const router = useRouter()
//   const { specificEvent } = router.query

//   console.log("Query", specificEvent)

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       const fetch = async () => {
//         try {
//           // console.log(specificEvent)
//           const res = await BaseUrl.get(`/${specificEvent}`);
//           console.log(res)
//           setData({ ...data, results: res.data });
//         } catch (err) {
//           console.log(err);
//         }
//       };
//       fetch();
//     }, 1000);
//     return () => clearTimeout(timeoutId);
//   }, [data.slug]);

//   return { data, setData };
// };

// export default useGetEvent;