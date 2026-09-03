'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bot, Send, RefreshCw, Settings, Image, Sparkles, Plus, Trash2, Save, Wand2, CheckCircle, XCircle, Clock, ListChecks, LogOut, AlertCircle } from 'lucide-react'

export default function AutomationDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [settings, setSettings] = useState({
    posts_per_day: 1,
    default_platforms: ['instagram'],
    include_images: true,
    delay_minutes: 10
  })
  const [contentLibrary, setContentLibrary] = useState([])
  const [isAutoPublishing, setIsAutoPublishing] = useState(false)
  const [autoPublishResult, setAutoPublishResult] = useState(null)
  const [error, setError] = useState(null)
  const [postedContent, setPostedContent] = useState([])
  
  // Account management
  const [showAccountForm, setShowAccountForm] = useState(false)
  const [newAccount, setNewAccount] = useState({
    platform: 'pinterest',
    display_name: '',
    copy_id: '',
    board_id: '',
    is_active: true
  })

  // Manual publish
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [manualPlatforms, setManualPlatforms] = useState([])
  const [includeImage, setIncludeImage] = useState(true)
  const [isPublishing, setIsPublishing] = useState(false)
  const [manualResult, setManualResult] = useState(null)

  // Define fetch functions FIRST before using them in useEffect
  const fetchAccounts = async () => {
    try {
      const response = await fetch('/api/automate/accounts')
      if (response.status === 401) {
        setAuthError('Session expired. Please login again.')
        return
      }
      const data = await response.json()
      setAccounts(data.accounts || [])
    } catch (error) {
      console.error('Error fetching accounts:', error)
      setError('Failed to fetch accounts')
    }
  }

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/automate/settings')
      if (response.status === 401) {
        setAuthError('Session expired. Please login again.')
        return
      }
      const data = await response.json()
      if (data.settings) {
        setSettings(data.settings)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      setError('Failed to fetch settings')
    }
  }

  const fetchContentLibrary = async () => {
    try {
      const response = await fetch('/api/automate/content-library')
      if (response.status === 401) {
        setAuthError('Session expired. Please login again.')
        return
      }
      const data = await response.json()
      setContentLibrary(data.content || [])
    } catch (error) {
      console.error('Error fetching content library:', error)
      setError('Failed to fetch content library')
    }
  }

  const fetchPostedContent = async () => {
    try {
      const response = await fetch('/api/automate/posted-content')
      if (response.status === 401) {
        setAuthError('Session expired. Please login again.')
        return
      }
      const data = await response.json()
      setPostedContent(data.posts || [])
    } catch (error) {
      console.error('Error fetching posted content:', error)
      setError('Failed to fetch posted content')
    }
  }

  // Check authentication on load - now fetch functions are defined
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check if cookie exists
        const cookies = document.cookie.split(';')
        const adminCookie = cookies.find(c => c.trim().startsWith('admin_authenticated='))
        
        if (!adminCookie || adminCookie.split('=')[1] !== 'true') {
          setAuthError('Session expired. Please login again.')
          setIsLoading(false)
          return
        }

        // Try to fetch data to verify authentication
        const response = await fetch('/api/automate/accounts')
        
        if (response.status === 401) {
          setAuthError('Session expired or invalid. Please login again.')
          setIsLoading(false)
          return
        }

        // If we get here, user is authenticated
        setIsLoading(false)
        fetchAccounts()
        fetchSettings()
        fetchContentLibrary()
        fetchPostedContent()
      } catch (error) {
        console.error('Auth check error:', error)
        setAuthError('Failed to connect to server. Please try again.')
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const handleAddAccount = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/automate/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAccount)
      })
      if (response.status === 401) {
        setAuthError('Session expired. Please login again.')
        return
      }
      const data = await response.json()
      if (data.account) {
        setAccounts([...accounts, data.account])
        setShowAccountForm(false)
        setNewAccount({ platform: 'pinterest', display_name: '', copy_id: '', board_id: '', is_active: true })
      }
    } catch (error) {
      console.error('Error adding account:', error)
      setError('Failed to add account')
    }
  }

  const handleDeleteAccount = async (id) => {
    try {
      const response = await fetch(`/api/automate/accounts?id=${id}`, { 
        method: 'DELETE'
      })
      if (response.status === 401) {
        setAuthError('Session expired. Please login again.')
        return
      }
      setAccounts(accounts.filter(a => a.id !== id))
    } catch (error) {
      console.error('Error deleting account:', error)
    }
  }

  const handleToggleActive = async (account) => {
    try {
      const response = await fetch('/api/automate/accounts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...account, is_active: !account.is_active })
      })
      if (response.status === 401) {
        setAuthError('Session expired. Please login again.')
        return
      }
      const data = await response.json()
      setAccounts(accounts.map(a => a.id === account.id ? data.account : a))
    } catch (error) {
      console.error('Error updating account:', error)
    }
  }

  const handleSaveSettings = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/automate/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      })
      if (response.status === 401) {
        setAuthError('Session expired. Please login again.')
        return
      }
      const data = await response.json()
      if (data.settings) {
        setSettings(data.settings)
        alert('Settings saved!')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      setError('Failed to save settings')
    }
  }

  const handleAutoPublish = async () => {
    setIsAutoPublishing(true)
    setError(null)
    setAutoPublishResult(null)
    try {
      const response = await fetch('/api/automate/auto-publish', {
        method: 'POST'
      })
      if (response.status === 401) {
        setAuthError('Session expired. Please login again.')
        setIsAutoPublishing(false)
        return
      }
      const data = await response.json()
      
      if (data.error) {
        setError(data.error)
      } else {
        setAutoPublishResult(data)
        fetchContentLibrary()
        fetchPostedContent()
      }
    } catch (error) {
      console.error('Auto-publish error:', error)
      setError('Failed to auto-publish')
    } finally {
      setIsAutoPublishing(false)
    }
  }

  const handleManualPublish = async (e) => {
    e.preventDefault()
    setIsPublishing(true)
    setError(null)
    setManualResult(null)
    
    try {
      const response = await fetch('/api/automate/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'blog',
          title,
          content,
          platforms: manualPlatforms,
          includeImage
        })
      })
      if (response.status === 401) {
        setAuthError('Session expired. Please login again.')
        setIsPublishing(false)
        return
      }
      const data = await response.json()
      setManualResult(data)
    } catch (error) {
      console.error('Manual publish error:', error)
      setError('Failed to publish')
    } finally {
      setIsPublishing(false)
    }
  }

  const handleLogout = () => {
    document.cookie = 'admin_authenticated=; path=/; max-age=0'
    window.location.href = '/admin/login'
  }

  // Show error state if authentication failed
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-6">{authError}</p>
          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Go to Login
            </button>
            <button
              onClick={() => {
                setAuthError(null)
                setIsLoading(true)
                window.location.reload()
              }}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition flex items-center justify-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Automation</h1>
          <p className="text-gray-600 mt-1">Automatically publish content from your site</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition flex items-center"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </button>
      </div>

      {/* Auto-Publish Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">One-Click Auto-Publish</h2>
            <p className="text-gray-600 text-sm">
              Will publish {settings.posts_per_day || 1} post(s) every {settings.delay_minutes || 10} minutes
            </p>
          </div>
          <button
            onClick={handleAutoPublish}
            disabled={isAutoPublishing || accounts.length === 0}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center"
          >
            {isAutoPublishing ? (
              <RefreshCw className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <Wand2 className="h-5 w-5 mr-2" />
            )}
            {isAutoPublishing ? 'Publishing...' : 'Auto-Publish Now'}
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {autoPublishResult && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-semibold text-green-800">
                Published {autoPublishResult.posts} post(s) to {autoPublishResult.platforms_used?.join(', ') || 'selected platforms'}
              </span>
            </div>
            
            {autoPublishResult.results && autoPublishResult.results.length > 0 && (
              <div className="mt-3 space-y-2">
                {autoPublishResult.results.map((result, index) => (
                  <div key={index} className="bg-white rounded p-3 border border-gray-200">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="font-medium text-gray-900">{result.content?.title || 'Untitled'}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Posted to: {Object.keys(result.publishResults || {}).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Connected Accounts */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Connected Accounts</h2>
            <button
              onClick={() => setShowAccountForm(!showAccountForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
            >
              {showAccountForm ? 'Cancel' : '+ Add Account'}
            </button>
          </div>

          {showAccountForm && (
            <form onSubmit={handleAddAccount} className="space-y-3 mb-4 bg-gray-50 p-4 rounded">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                  <select
                    value={newAccount.platform}
                    onChange={(e) => setNewAccount({ ...newAccount, platform: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="pinterest">Pinterest</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter/X</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={newAccount.display_name}
                    onChange={(e) => setNewAccount({ ...newAccount, display_name: e.target.value })}
                    placeholder="e.g. TheLoadCalc"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Copy ID</label>
                <input
                  type="text"
                  value={newAccount.copy_id}
                  onChange={(e) => setNewAccount({ ...newAccount, copy_id: e.target.value })}
                  placeholder="e.g. abc123def456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {newAccount.platform === 'pinterest' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Board ID</label>
                  <input
                    type="text"
                    value={newAccount.board_id}
                    onChange={(e) => setNewAccount({ ...newAccount, board_id: e.target.value })}
                    placeholder="e.g. your-board-id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              )}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Save Account
              </button>
            </form>
          )}

          <div className="space-y-3">
            {accounts.map(account => (
              <div key={account.id} className="flex items-center justify-between bg-gray-50 rounded p-3">
                <div>
                  <div className="font-medium text-gray-900">{account.display_name || account.platform}</div>
                  <div className="text-xs text-gray-500">
                    {account.platform} | Copy: {account.copy_id?.slice(0, 8) || 'N/A'}...
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleActive(account)}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      account.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {account.is_active ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => handleDeleteAccount(account.id)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {accounts.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No accounts connected. Add your first account.
              </p>
            )}
          </div>
        </div>

        {/* Settings & Manual Publish */}
        <div className="space-y-8">
          {/* Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Automation Settings</h2>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Posts per Run</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={settings.posts_per_day}
                    onChange={(e) => setSettings({ ...settings, posts_per_day: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delay (minutes)</label>
                  <input
                    type="number"
                    min="0"
                    max="10080"
                    value={settings.delay_minutes}
                    onChange={(e) => setSettings({ ...settings, delay_minutes: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum: 10080 minutes (7 days). 1440 = 1 day. 4320 = 3 days. 10080 = 7 days.
                  </p>
                </div>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.include_images}
                  onChange={(e) => setSettings({ ...settings, include_images: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm">Include images in posts</span>
              </label>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Save Settings
              </button>
            </form>
          </div>

          {/* Manual Publish */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Manual Publish</h2>
            <form onSubmit={handleManualPublish} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. How Many Solar Panels Do I Need?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your blog post content..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md resize-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {['pinterest', 'instagram', 'twitter', 'facebook', 'linkedin'].map(platform => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => {
                        setManualPlatforms(prev => 
                          prev.includes(platform) 
                            ? prev.filter(p => p !== platform) 
                            : [...prev, platform]
                        )
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        manualPlatforms.includes(platform)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={includeImage}
                  onChange={(e) => setIncludeImage(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Generate image with FAL AI</span>
              </label>
              <button
                type="submit"
                disabled={isPublishing}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
              >
                {isPublishing ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                {isPublishing ? 'Publishing...' : 'Publish'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Posted Content History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Posts</h2>
        {postedContent.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Title</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Platforms</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Image</th>
                  <th className="text-left py-2 px-3 font-semibold text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {postedContent.slice(0, 10).map(post => (
                  <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-3 font-medium text-gray-900">{post.content_title}</td>
                    <td className="py-2 px-3 text-gray-600">
                      {Array.isArray(post.platforms) ? post.platforms.join(', ') : post.platforms}
                    </td>
                    <td className="py-2 px-3">
                      {post.image_url ? (
                        <img src={post.image_url} alt={post.content_title} className="h-10 w-10 object-cover rounded" />
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No posts published yet. Click "Auto-Publish Now" to start.
          </p>
        )}
      </div>
    </div>
  )
}