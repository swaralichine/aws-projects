import { createClient } from 'contentful'

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
const environment =
  import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'

if (!space || !accessToken) {
  throw new Error(
    'Missing Contentful environment variables. Check the app/.env file.',
  )
}

const client = createClient({
  space,
  accessToken,
  environment,
})

export async function getTravelStories() {
  const response = await client.getEntries({
    content_type: 'travelStory',
    order: ['sys.createdAt'],
  })

  return response.items
}