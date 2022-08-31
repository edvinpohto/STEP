// Function that checks whether an event has been liked to decide
// if it should be red or not on the screen

export default function checkIfLiked(property: any) {
  if (property.eventLikes.includes(property.currentUser)) {
    return true
  } else {
    return false
  }
}