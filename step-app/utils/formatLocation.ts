// Util function to format the location string for display

export default function formatLocation(data: string) {
  let locationArray: string[] = data.split(",")
  let formattedLocation = locationArray[0]

  return formattedLocation
}