'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Share2, RefreshCw, Plus, Trash2 } from 'lucide-react'
import { SocialScheduler } from '../../../lib/socialScheduler'

export default function SocialSchedulerPage() {
  const [scheduledPosts, setScheduledPosts] = useState([])
  const [publishedPosts, setPublishedPosts] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAddModal, setShowAddModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load scheduled and published posts
    const scheduler = new SocialScheduler()
    scheduler.loadScheduledPosts().then(() => {
      setScheduledPosts(scheduler.getScheduledPosts())
      setPublishedPosts(scheduler.getPublishedPosts())
      setIsLoading(false)
    })
  }, [])

  const handlePublishNow = async (post) => {
    // Manually publish a post
    const scheduler = new SocialScheduler()
    await scheduler.publishPost(post)
    
    // Refresh the lists
    setScheduledPosts(scheduler.getScheduledPosts())
    setPublishedPosts(scheduler.getPublishedPosts())
  }

  const handleDeletePost = (postId) => {
    setScheduledPosts(scheduledPosts.filter(post => post.id !== postId))
  }

  const handleSchedulePost = (platform, content, scheduledFor) => {
    const scheduler = new SocialScheduler()
    const newPost = scheduler.schedulePost(platform, content, scheduledFor)
    setScheduledPosts([...scheduledPosts, newPost])
    setShowAddModal(false)
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Social Media Scheduler</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="ebay-btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule Post
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="ebay-card p-6">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {scheduledPosts.length}
          </div>
          <div className="text-gray-600">Posts Scheduled</div>
        </div>
        <div className="ebay-card p-6">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {publishedPosts.length}
          </div>
          <div className="text-gray-600">Posts Published</div>
        </div>
        <div className="ebay-card p-6">
          <div className="text-3xl font-bold text-yellow-600 mb-1">
            {scheduledPosts.length + publishedPosts.length}
          </div>
          <div className="text-gray-600">Total Posts</div>
        </div>
      </div>

      {/* Scheduled Posts */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Scheduled Posts</h2>
        <div className="space-y-4">
          {scheduledPosts.length > 0 ? (
            scheduledPosts.map(post => (
              <div key={post.id} className="ebay-card p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                    post.platform === 'pinterest' ? 'bg-red-100 text-red-600' :
                    post.platform === 'twitter' ? 'bg-blue-100 text-blue-600' :
                    'bg-blue-200 text-blue-800'
                  }`}>
                    {post.platform === 'pinterest' ? 'P' :
                     post.platform === 'twitter' ? 'T' : 'F'}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {post.content.title || post.content.text?.slice(0, 50)}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.scheduledFor.toLocaleDateString()}
                      <Clock className="h-4 w-4 ml-3 mr-1" />
                      {post.scheduledFor.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePublishNow(post)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Publish Now
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="ebay-card p-6 text-center text-gray-600">
              No scheduled posts. Click "Schedule Post" to add one.
            </div>
          )}
        </div>
      </div>

      {/* Published Posts */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Published Posts</h2>
        <div className="space-y-4">
          {publishedPosts.length > 0 ? (
            publishedPosts.map(post => (
              <div key={post.id} className="ebay-card p-4 flex items-center justify-between opacity-75">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4 bg-green-100 text-green-600">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {post.content.title || post.content.text?.slice(0, 50)}
                    </h3>
                    <div className="text-sm text-gray-500 mt-1">
                      Published on {post.platform} at {post.publishedAt?.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {post.platform}
                </div>
              </div>
            ))
          ) : (
            <div className="ebay-card p-6 text-center text-gray-600">
              No posts published yet.
            </div>
          )}
        </div>
      </div>

      {/* Add Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Schedule New Post</h2>
            
            <form onSubmit={(e) => {
              e.preventDefault()
              const platform = e.target.platform.value
              const content = e.target.content.value
              const date = e.target.date.value
              const time = e.target.time.value
              
              const scheduledFor = new Date(`${date}T${time}`)
              handleSchedulePost(platform, { text: content }, scheduledFor)
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                  <select name="platform" className="ebay-input">
                    <option value="pinterest">Pinterest</option>
                    <option value="twitter">Twitter/X</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    name="content"
                    className="ebay-input h-24 resize-none"
                    placeholder="Enter your post content..."
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" name="date" className="ebay-input" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input type="time" name="time" className="ebay-input" required />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button type="submit" className="ebay-btn-primary">
                  Schedule Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}