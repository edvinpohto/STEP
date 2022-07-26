export default function checkIfLiked(property: any) {
  if (property.eventLikes.includes(property.currentUser)) {
    return true
  } else {
    return false
  }
}