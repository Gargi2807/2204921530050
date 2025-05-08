import { Suspense } from "react"
import { getTrendingPosts } from "@/lib/api"
import { PostCard } from "@/components/post-card"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Trending Posts | Social Media Analytics",
  description: "Posts with the maximum number of comments",
}

async function TrendingPostsContent() {
  const trendingPosts = await getTrendingPosts()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {trendingPosts.map((post) => (
        <PostCard key={post.id} post={post} showComments={true} />
      ))}
    </div>
  )
}

function TrendingPostsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
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
  )
}

export default function TrendingPostsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
          Trending Posts
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Posts with the maximum number of comments</p>
      </div>

      <Suspense fallback={<TrendingPostsSkeleton />}>
        <TrendingPostsContent />
      </Suspense>
    </div>
  )
}
