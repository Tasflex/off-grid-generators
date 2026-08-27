// Twitter API integration for automatic posting
export const twitterConfig = {
  apiBase: 'https://api.twitter.com/2',
  bearerToken: process.env.TWITTER_BEARER_TOKEN
}

// Create tweet
export async function createTweet(text, mediaUrl = null) {
  try {
    const body = { text }
    
    if (mediaUrl) {
      // Upload media first
      const mediaId = await uploadMedia(mediaUrl)
      if (mediaId) {
        body.media = { media_ids: [mediaId] }
      }
    }

    const response = await fetch(`${twitterConfig.apiBase}/tweets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${twitterConfig.bearerToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) throw new Error('Failed to create tweet')
    
    return await response.json()
  } catch (error) {
    console.error('Twitter post error:', error)
    return null
  }
}

// Upload media to Twitter
async function uploadMedia(imageUrl) {
  try {
    const response = await fetch('https://upload.twitter.com/1.1/media/upload.json', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${twitterConfig.bearerToken}`
      },
      body: JSON.stringify({
        media_category: 'tweet_image'
      })
    })
    
    // This is a simplified version - in production you'd handle the media upload properly
    return null
  } catch (error) {
    console.error('Media upload error:', error)
    return null
  }
}

// Generate tweet content from blog post
export function generateTweetFromPost(post) {
  const tweet = {
    text: `${post.title}\n\n${post.excerpt.slice(0, 100)}...\n\nCheck it out: ${post.url}`,
    mediaUrl: post.image
  }
  
  return tweet
}