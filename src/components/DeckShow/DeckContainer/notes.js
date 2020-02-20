try {
  const response = await axios.get(`/api/decks/${params.id}`)
  const { mainboard, sideboard, name, format } = response.data
  setDeckInfo(response.data)
} catch (error) {
  if (axios.isCancel(error)) {
  } else {
    console.error(error.response)
  }
}
