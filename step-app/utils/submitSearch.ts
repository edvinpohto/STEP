export default async function handleSearch(e: any) {
  // Stop the form from submitting and refreshing the page.
  e.preventDefault()

  console.log(e.target.eventSearch.value)
  location.href = `/events/search/${e.target.eventSearch.value}`;
}