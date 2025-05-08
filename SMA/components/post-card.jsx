import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getPostImage, getUserAvatar } from "@/lib/api"
import { Heart, MessageSquare, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function PostCard({ post, showComments = false }) {
  const formattedDate = post.timestamp ? new Date(post.timestamp).toLocaleString() : "Recent"

  // Generate random engagement numbers
  const likes = Math.floor(Math.random() * 100) + post.commentCount
  const shares = Math.floor(Math.random() * 20) + Math.floor(post.commentCount / 2)

  return (
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-slate-800">
      <CardHeader className="p-4 pb-0 flex flex-row items-center gap-3">
        <Avatar className="border-2 border-white dark:border-slate-700 shadow-sm">
          <AvatarImage
            src={getUserAvatar(post.userId) || "/placeholder.svg"}
            alt={post.user?.name || `User ${post.userId}`}
          />
          <AvatarFallback className="bg-gradient-to-br from-pink-500 to-rose-500 text-white">
            {post.user?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-bold">{post.user?.name || `User ${post.userId}`}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{formattedDate}</p>
        </div>
        {post.commentCount > 10 && (
          <Badge
            variant="outline"
            className="ml-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0"
          >
            Hot 🔥
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-bold text-lg capitalize">{post.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{post.body}</p>
        </div>
        <div className="relative h-48 mt-4 rounded-md overflow-hidden shadow-md">
          <Image
            src={getPostImage(post.id) || "/placeholder.svg"}
            alt={post.title}
            width={600}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer">
          <Heart className="h-5 w-5" />
          <span className="text-sm font-medium">{likes}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-purple-500 dark:hover:text-purple-400 transition-colors cursor-pointer">
          <MessageSquare className="h-5 w-5" />
          <span className="text-sm font-medium">{post.commentCount}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-pointer">
          <Share2 className="h-5 w-5" />
          <span className="text-sm font-medium">{shares}</span>
        </div>
      </CardFooter>

      {showComments && post.comments.length > 0 && (
        <div className="px-4 pb-4 space-y-2">
          <h4 className="text-sm font-bold">Top Comments</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {post.comments.slice(0, 3).map((comment) => (
              <div key={comment.id} className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-md text-sm">
                <p className="font-bold text-slate-800 dark:text-slate-200">{comment.name}</p>
                <p className="text-slate-600 dark:text-slate-300">{comment.body}</p>
              </div>
            ))}
            {post.comments.length > 3 && (
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-1 bg-slate-100 dark:bg-slate-700/30 rounded-md">
                + {post.comments.length - 3} more comments
              </p>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
