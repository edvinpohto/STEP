// Util function to slice up the date and time string from the database
// and return a spruced up version

export default function formatDateAndTime(data: string) {
  let day: string = data.slice(8,10)
  let month: string = data.slice(5,7)
  let year: string = data.slice(0,4)
  let time: string = data.slice(11)

  let formattedDateAndTime = `${day}/${month}/${year} at ${time}`

  return formattedDateAndTime
}