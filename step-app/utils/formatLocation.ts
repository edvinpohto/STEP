export default function formatLocation(data: string) {
  // console.log(data)
  let locationArray: string[] = data.split(",")
  let formattedLocation = locationArray[0]

  return formattedLocation
}