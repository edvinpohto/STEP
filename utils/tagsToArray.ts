// util function to make tags string retrieved an array

export function tagsToArray(tags: string) {
	let tagsArray: string[] = tags.split(",")
  return tagsArray
}