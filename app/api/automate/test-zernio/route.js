import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request) {
  try {
    const body = await request.json()
    
    console.log('Testing Zernio with payload:', JSON.stringify(body, null, 2))
    
    // Try different API URLs
    const apiUrls = [
      'https://api.zernio.com/api/v1/posts',
      'https://app.zernio.com/api/v1/posts'
    ]
    
    let lastError = null
    
    for (const url of apiUrls) {
      try {
        const response = await axios.post(
          url,
          body,
          {
            headers: {
              'Authorization': `Bearer ${process.env.ZERNIO_API_KEY}`,
              'Content-Type': 'application/json'
            },
            timeout: 30000
          }
        )
        
        return NextResponse.json({
          success: true,
          url: url,
          response: response.data
        })
      } catch (error) {
        lastError = error
        console.error(`Failed with ${url}:`, error.message)
        if (error.response) {
          console.error('Zernio error response:', JSON.stringify(error.response.data, null, 2))
          console.error('Zernio error status:', error.response.status)
        }
      }
    }
    
    // If all URLs failed
    return NextResponse.json(
      { 
        error: lastError?.message,
        responseData: lastError?.response?.data,
        status: lastError?.response?.status
      },
      { status: 500 }
    )
  } catch (error) {
    console.error('Zernio test error:', error.message)
    return NextResponse.json(
      { error: error.message, stack: error.stack },
      { status: 500 }
    )
  }
}