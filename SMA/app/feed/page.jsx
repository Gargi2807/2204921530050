"use client"

import { useState, useEffect } from "react"
import { getFeedPosts } from "@/lib/api"
import { PostCard } from "@/components/post-card"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeedPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchPosts = async () => {
    try {
      const feedPosts = await getFeedPosts()
      setPosts(feedPosts)
    } catch (error) {
      console.error("Failed to fetch feed posts:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchPosts()
  }

  useEffect(() => {
    fetchPosts()

    // Set up polling for real-time updates
    const interval = setInterval(() => {
      fetchPosts()
    }, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500">
            Live Feed
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Real-time posts with newest at the top</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24 bg-slate-200 dark:bg-slate-700" />
                  <Skeleton className="h-3 w-16 bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
              <Skeleton className="h-5 w-full bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="h-4 w-4/5 bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="h-48 w-full rounded-md bg-slate-200 dark:bg-slate-700" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-6 w-16 bg-slate-200 dark:bg-slate-700" />
                <Skeleton className="h-6 w-16 bg-slate-200 dark:bg-slate-700" />
                <Skeleton className="h-6 w-16 bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
