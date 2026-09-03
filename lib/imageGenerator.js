// lib/imageGenerator.js
import axios from 'axios'

// FAL AI configuration
const FAL_BASE_URL = process.env.FAL_BASE_URL || 'https://queue.fal.run'
const FAL_MODEL = process.env.FAL_MODEL || 'fal-ai/flux/dev'
const FAL_KEY = process.env.FAL_KEY

// ============================================
// FAL AI (Flux) Image Generation
// ============================================
export async function generateImage({ prompt, width = 1200, height = 630 }) {
  try {
    const submitResponse = await axios.post(
      `https://queue.fal.run/fal-ai/flux/dev`,
      {
        prompt: prompt,
        image_size: { width: width, height: height },
        num_inference_steps: 28,
        guidance_scale: 3.5,
        sync_mode: false
      },
      {
        headers: {
          'Authorization': `Key ${process.env.FAL_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    )
    
    const requestId = submitResponse.data.request_id
    const responseUrl = submitResponse.data.response_url
    const statusUrl = submitResponse.data.status_url
    
    return await pollFalGeneration(statusUrl, responseUrl)
  } catch (error) {
    console.error('FAL AI API error:', error.message)
    return null
  }
}

async function pollFalGeneration(statusUrl, responseUrl, retries = 30) {
  try {
    const response = await axios.get(statusUrl, {
      headers: { 'Authorization': `Key ${process.env.FAL_KEY}` },
      timeout: 30000
    })
    
    if (response.data.status === 'COMPLETED') {
      const imageResponse = await axios.get(responseUrl, {
        headers: { 'Authorization': `Key ${process.env.FAL_KEY}` },
        timeout: 30000
      })
      
      const images = imageResponse.data.images
      if (images && images.length > 0) {
        return images[0].url
      }
      
      return null
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    return await pollFalGeneration(statusUrl, responseUrl, retries - 1)
  } catch (error) {
    console.error('FAL polling error:', error.message)
    return null
  }
}

// Helper function to find image URL in FAL response
function extractImageUrl(data) {
  if (!data) return null
  
  if (data.images && data.images[0]) {
    if (typeof data.images[0] === 'string') return data.images[0]
    if (data.images[0].url) return data.images[0].url
  }
  
  if (data.image_url) return data.image_url
  if (data.image) return data.image
  if (data.url) return data.url
  
  if (data.output) {
    if (data.output.images) {
      if (typeof data.output.images[0] === 'string') return data.output.images[0]
      if (data.output.images[0].url) return data.output.images[0].url
    }
    if (data.output.image_url) return data.output.image_url
    if (data.output.image) return data.output.image
  }
  
  if (data.data) {
    if (data.data.images) {
      if (typeof data.data.images[0] === 'string') return data.data.images[0]
      if (data.data.images[0].url) return data.data.images[0].url
    }
    if (data.data.image_url) return data.data.image_url
  }
  
  return null
}

// ============================================
// Dynamic Platform Image Generator
// ============================================
export async function generatePlatformSpecificImage(descriptivePrompt, platform) {
  let width = 1200;
  let height = 630;

  if (platform === 'pinterest') {
    width = 1000;
    height = 1500;
  } else if (platform === 'instagram' || platform === 'threads') {
    width = 1080;
    height = 1350;
  } else if (platform === 'youtube') {
    width = 1280;
    height = 720;
  }

  console.log(`Generating ${width}x${height} image for ${platform}...`);
  return await generateImage({ prompt: descriptivePrompt, width, height });
}