import { NextResponse } from 'next/server'
import { generateImage } from '../../../../lib/imageGenerator'

export async function GET() {
  try {
    console.log('Testing FAL AI image generation...')
    
    const imageUrl = await generateImage({
      prompt: 'A modern solar panel installation on a beautiful home roof at sunset, professional photography, 4k quality',
      width: 1024,
      height: 1024
    })
    
    return NextResponse.json({
      success: true,
      image: imageUrl || 'No image generated',
      message: imageUrl ? 'Image generated successfully!' : 'Image generation failed or returned null'
    })
  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}