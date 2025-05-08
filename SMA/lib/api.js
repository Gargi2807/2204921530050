// Base API URL - in a real app, this would be an environment variable
const API_BASE_URL = "https://jsonplaceholder.typicode.com"

// Fetch all users
export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`)
  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }
  return response.json()
}

// Fetch all posts
export async function fetchPosts() {
  const response = await fetch(`${API_BASE_URL}/posts`)
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }

  // Add a timestamp for sorting by newest (simulating real-time data)
  const posts = await response.json()
  return posts.map((post) => ({
    ...post,
    timestamp: Date.now() - Math.floor(Math.random() * 1000000), // Random recent timestamp
  }))
}

// Fetch all comments
export async function fetchComments() {
  const response = await fetch(`${API_BASE_URL}/comments`)
  if (!response.ok) {
    throw new Error("Failed to fetch comments")
  }
  return response.json()
}

// Fetch comments for a specific post
export async function fetchCommentsForPost(postId) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`)
  if (!response.ok) {
    throw new Error(`Failed to fetch comments for post ${postId}`)
  }
  return response.json()
}

// Get posts with their comments
export async function getPostsWithComments() {
  const [posts, comments, users] = await Promise.all([fetchPosts(), fetchComments(), fetchUsers()])

  // Create a map of users by ID for quick lookup
  const userMap = new Map(users.map((user) => [user.id, user]))

  // Group comments by postId
  const commentsByPostId = comments.reduce((acc, comment) => {
    if (!acc[comment.postId]) {
      acc[comment.postId] = []
    }
    acc[comment.postId].push(comment)
    return acc
  }, {})

  // Combine posts with their comments
  return posts.map((post) => ({
    ...post,
    user: userMap.get(post.userId),
    comments: commentsByPostId[post.id] || [],
    commentCount: commentsByPostId[post.id]?.length || 0,
  }))
}

// Get top users with most commented posts
export async function getTopUsers(limit = 5) {
  const [users, postsWithComments] = await Promise.all([fetchUsers(), getPostsWithComments()])

  // Group posts by userId
  const postsByUserId = postsWithComments.reduce((acc, post) => {
    if (!acc[post.userId]) {
      acc[post.userId] = []
    }
    acc[post.userId].push(post)
    return acc
  }, {})

  // Calculate total comments for each user
  const usersWithStats = users.map((user) => {
    const userPosts = postsByUserId[user.id] || []
    const totalComments = userPosts.reduce((sum, post) => sum + post.commentCount, 0)

    return {
      ...user,
      posts: userPosts,
      totalComments,
    }
  })

  // Sort by total comments and take the top 'limit'
  return usersWithStats.sort((a, b) => b.totalComments - a.totalComments).slice(0, limit)
}

// Get trending posts (posts with maximum comments)
export async function getTrendingPosts() {
  const postsWithComments = await getPostsWithComments()

  // Find the maximum comment count
  const maxComments = Math.max(...postsWithComments.map((post) => post.commentCount))

  // Filter posts with the maximum comment count
  return postsWithComments
    .filter((post) => post.commentCount === maxComments)
    .sort((a, b) => b.commentCount - a.commentCount)
}

// Get feed posts sorted by newest
export async function getFeedPosts() {
  const postsWithComments = await getPostsWithComments()

  // Sort by timestamp (newest first)
  return postsWithComments.sort((a, b) => {
    return (b.timestamp || 0) - (a.timestamp || 0)
  })
}

// Generate a real avatar URL for a user
export function getUserAvatar(userId) {
  // Array of real profile image URLs
  const profileImages = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
  ]

  // Use userId to select an image (with modulo to handle more than 10 users)
  return profileImages[(userId - 1) % profileImages.length]
}

// Generate a real image URL for a post
export function getPostImage(postId) {
  // Map of categories to real image URLs
  const categoryImages = {
    technology: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    ],
    nature: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    ],
    business: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    ],
    food: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
    ],
    travel: [
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=600&h=400&fit=crop",
    ],
    lifestyle: [
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1469571486292-b53926c9118f?w=600&h=400&fit=crop",
    ],
  }

  // Categories array for easy access
  const categories = Object.keys(categoryImages)

  // Select a category based on postId
  const category = categories[postId % categories.length]

  // Select an image from the category (using a secondary hash of the postId)
  const imageIndex = Math.floor(postId / categories.length) % categoryImages[category].length

  return categoryImages[category][imageIndex]
}
