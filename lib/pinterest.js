// Pinterest API integration for automatic pinning
export const pinterestConfig = {
  boardId: 'YOUR_PINTEREST_BOARD_ID',
  accessToken: process.env.PINTEREST_ACCESS_TOKEN,
  apiBase: 'https://api-sandbox.pinterest.com/v5'
}

// Create pin for product
export async function createPin({ title, description, link, imageUrl }) {
  try {
    const response = await fetch(`${pinterestConfig.apiBase}/pins`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${pinterestConfig.accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        board_id: pinterestConfig.boardId,
        title,
        description,
        link,
        media_source: {
          source_type: 'image_url',
          url: imageUrl
        }
      })
    })

    if (!response.ok) throw new Error('Failed to create pin')
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Pinterest pin creation error:', error)
    return null
  }
}

// Schedule batch pin creation
export async function schedulePins(products) {
  const results = []
  
  for (const product of products) {
    const pin = await createPin({
      title: `${product.name} - OffGrid Power Review`,
      description: `Check out our review of the ${product.name}. ${product.capacity}Wh capacity, ${product.output}W output. Click to learn more!`,
      link: product.affiliateUrl,
      imageUrl: product.image
    })
    
    results.push(pin)
    
    // Rate limiting - wait 1 second between pins
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  return results
}

// Track pin performance
export async function getPinAnalytics(pinId) {
  try {
    const response = await fetch(`${pinterestConfig.apiBase}/pins/${pinId}/analytics`, {
      headers: {
        'Authorization': `Bearer ${pinterestConfig.accessToken}`
      }
    })
    
    if (!response.ok) throw new Error('Failed to get analytics')
    
    return await response.json()
  } catch (error) {
    console.error('Pinterest analytics error:', error)
    return null
  }
}