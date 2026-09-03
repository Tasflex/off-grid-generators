// lib/contentGenerator.js
import axios from 'axios'

// ============================================
// DeepSeek API (Main AI)
// ============================================
export async function generateWithDeepSeek(prompt, systemPrompt = '') {
  try {
    const response = await axios.post(
      `${process.env.DEEPSEEK_BASE_URL}/chat/completions`,
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt || 'You are a helpful content creator.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data.choices[0].message.content
  } catch (error) {
    console.error('DeepSeek API error:', error.message)
    return null
  }
}

// ============================================
// Generate Content (for manual publish)
// ============================================
export async function generateContent({ type, topic, keywords = [] }) {
  const prompt = `Create a ${type} post about "${topic}"${keywords.length > 0 ? ` with keywords: ${keywords.join(', ')}` : ''}. 
  The content should be informative, engaging, and well-structured. Include an introduction, main points, and a conclusion.
  Return the content as a single text block.`

  const systemPrompt = 'You are an expert content writer specializing in solar energy, off-grid power, and sustainable living.'

  return await generateWithDeepSeek(prompt, systemPrompt)
}

// ============================================
// Summarize Content for Social Media
// ============================================
export async function summarizeForSocial({ content, title }, platform) {
  const prompt = `Summarize this article for ${platform}:
  
  Title: ${title}
  Content: ${content}
  
  Create a compelling ${platform} post that drives engagement. Keep it concise and platform-appropriate.`

  const systemPrompt = `You are a social media expert. Create engaging, platform-specific summaries.`

  return await generateWithDeepSeek(prompt, systemPrompt)
}

// ============================================
// Generate New Content Idea
// ============================================
export async function generateNewContentIdea(niche = 'solar power') {
  const prompt = `Generate a unique, high-potential blog post idea for a ${niche} website.
  
  Requirements:
  - Must be SEO-friendly with high search volume potential
  - Should solve a real problem or answer a common question
  - Include a compelling title and a 2-3 sentence summary
  - Suggest 5-7 key topics to cover
  - Include a suggested target audience

  Return as JSON: { "title": "", "summary": "", "topics": [], "audience": "" }`

  const systemPrompt = 'You are an expert content strategist. Output valid JSON only.'

  try {
    const response = await generateWithDeepSeek(prompt, systemPrompt)
    const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim()
    return JSON.parse(cleanJson)
  } catch (error) {
    console.error('Error generating content idea:', error)
    return null
  }
}

// ============================================
// Generate Multi-Platform Captions
// ============================================
export async function generatePlatformCaptions(articleTitle, executiveSummary) {
  const prompt = `You are a visionary brand voice architect. I am publishing: ${articleTitle}.
  
  Context: ${executiveSummary}
  
  Write distinct social media captions that avoid corporate jargon. Inject raw storytelling, dry humor, and insightful emotional hooks. Be uniquely authentic, thought-provoking, and unforgettable without being aggressive or rude. Give the stories room to breathe (make them medium-length).
  
  1. linkedin: Break down a common industry myth using a thoughtful, expert tone. (4 to 6 sentences). End by instructing them to click the link in our bio for the full breakdown.
  2. facebook: A relatable emotional story of a struggle and the lesson learned. End by asking a direct question about their setup to drive comments, followed by telling them to click the link in our bio.
  3. instagram: Aesthetic, lifestyle-focused insight. 3 to 4 punchy lines. End with a sharp question to drive comments, and tell them to hit the link in the bio.
  4. threads: A thought-provoking contrarian hook to spark a healthy, insightful debate.
  5. x: A high-utility truth bomb wrapped in a bit of dry wit.
  6. telegram: Direct, high-value breakdown. High signal, zero fluff.
  7. youtube: A captivating, story-driven hook that creates intense curiosity for the full content. Tell them the link is in the bio.
  
  Return ONLY a raw JSON object: { "linkedin": "", "facebook": "", "instagram": "", "threads": "", "x": "", "telegram": "", "youtube": "" }`

  const systemPrompt = `You are a senior data engineer. Output strictly raw JSON.`
  
  try {
    const response = await axios.post(
      `${process.env.DEEPSEEK_BASE_URL}/chat/completions`,
      {
        model: `deepseek-chat`,
        messages: [
          { role: `system`, content: systemPrompt },
          { role: `user`, content: prompt }
        ],
        temperature: 0.85,
        max_tokens: 2000,
        response_format: { type: `json_object` }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': `application/json`
        }
      }
    )
    
    const text = response.data.choices[0].message.content
    const cleanJson = text.replace(/```json/g, ``).replace(/```/g, ``).trim()
    return JSON.parse(cleanJson)
  } catch (error) {
    console.error(`DeepSeek caption generation error:`, error.message)
    return null
  }
}

// ============================================
// Generate Visual Prompt for Image AI
// ============================================
export async function generateVisualPrompt(title, summary, niche = 'solar power') {
  const prompt = `You are an expert art director and photographer. 
Convert this article topic and summary into a single, highly descriptive natural language photographic prompt for a Flux image generation model.

Article Title: ${title}
Summary: ${summary}
Industry/Niche: ${niche}

Rules for Flux Models:
- Place the core subject first, followed by action, style, environment, and lighting (hierarchical importance).
- Describe a concrete, literal scene.
- Specify real camera gear and framing (e.g., shot on 35mm lens, f/1.8, golden hour lighting, cinematic composition).
- Never use generic buzzwords like photorealistic, hyperrealistic, or 8K. Use precise descriptors instead.
- NO TEXT, typography, logos, UI overlays, or diagrams. Focus purely on the visual scene.
- Output ONLY the prompt string, with no quotes or preamble.`

  return await generateWithDeepSeek(prompt, 'You are an elite creative art director.')
}

// ============================================
// Auto-Publish Content to Zernio
// ============================================
export async function publishToZernio({ content, images, platforms, scheduledFor, copyId, boardId, platformSpecificContent }) {
  try {
    const platformsArray = platforms.map(platform => {
      const platformObj = {
        platform: platform,
        accountId: copyId
      }
      
      if (platform === 'pinterest' && boardId) {
        platformObj.platformSpecificData = {
          boardId: boardId
        }
      }
      
      return platformObj
    })
    
    const mediaItems = images.map(url => ({
      type: 'image',
      url: url
    }))
    
    const publishTime = scheduledFor || new Date(Date.now() + 5 * 60 * 1000).toISOString()
    
    const payload = {
      content: content,
      scheduledFor: publishTime,
      mediaItems: mediaItems,
      platforms: platformsArray,
      platformSpecificContent: platformSpecificContent || {}
    }
    
    console.log('Zernio payload:', JSON.stringify(payload, null, 2))
    
    const response = await axios.post(
      'https://api.zernio.com/v1/posts',
      payload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.ZERNIO_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    )
    
    return response.data
  } catch (error) {
    console.error('Zernio API error:', error.message)
    if (error.response) {
      console.error('Zernio error response:', JSON.stringify(error.response.data, null, 2))
      console.error('Zernio error status:', error.response.status)
    }
    return null
  }
}