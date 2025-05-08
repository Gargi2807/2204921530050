import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getUserAvatar } from "@/lib/api"
import { MessageSquare } from "lucide-react"

export function UserCard({ user, rank }) {
  // Generate a gradient based on the user ID
  const gradients = [
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-green-500",
    "from-amber-500 to-yellow-500",
  ]

  const gradientClass = gradients[user.id % gradients.length]

  return (
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className={`relative h-32 bg-gradient-to-r ${gradientClass}`}>
          <div className="absolute -bottom-12 left-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white dark:border-slate-900 shadow-md">
              <Image
                src={getUserAvatar(user.id) || "/placeholder.svg"}
                alt={user.name}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 text-sm font-bold shadow-md">
            #{rank}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-14 pb-4">
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{user.name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">@{user.username}</p>
          <div className="flex items-center gap-2 text-sm mt-4 bg-slate-100 dark:bg-slate-800 p-2 rounded-md">
            <MessageSquare className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <span>
              <strong className="font-bold">{user.totalComments}</strong> comments across{" "}
              <strong className="font-bold">{user.posts.length}</strong> posts
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
