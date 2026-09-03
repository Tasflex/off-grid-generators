import { NextResponse } from 'next/server'
import { generateContent, generateNewContentIdea } from '../../../../lib/contentGenerator'

// Test the AI integration
export async function GET() {
  try {
    // Test DeepSeek
    const testResult = await generateContent(
      'Write a 3-sentence description about solar generators for a beginner audience.',
      'You are a solar energy expert writing for a general audience.'
    )
    
    // Test content idea
    const idea = await generateNewContentIdea('solar power', ['solar generator', 'off-grid', 'van life'])
    
    return NextResponse.json({
      success: true,
      deepseekTest: testResult,
      contentIdea: idea
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}