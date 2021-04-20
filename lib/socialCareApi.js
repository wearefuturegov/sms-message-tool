export const getContactMetadata = async socialCareId => {
  const res = await fetch(
    `${process.env.SOCIAL_CARE_API_ENDPOINT}/residents?mosaic_id=${socialCareId}`,
    {
      headers: {
        "x-api-key": process.env.SOCIAL_CARE_API_KEY,
      },
    }
  )
  const data = await res.json()
  return data?.residents?.find(
    result => Number(result.mosaicId) === socialCareId
  )
}
