import { Suspense } from "react"
import { getTopUsers } from "@/lib/api"
import { UserCard } from "@/components/user-card"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Top Users | Social Media Analytics",
  description: "Top users with the most commented posts",
}

async function TopUsersContent() {
  const topUsers = await getTopUsers(5)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {topUsers.map((user, index) => (
        <UserCard key={user.id} user={user} rank={index + 1} />
      ))}
    </div>
  )
}

function TopUsersSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="relative overflow-hidden rounded-t-lg">
            <Skeleton className="h-32 w-full bg-slate-200 dark:bg-slate-700" />
            <Skeleton className="absolute -bottom-12 left-4 h-24 w-24 rounded-full border-4 border-white dark:border-slate-900" />
          </div>
          <div className="space-y-2 pt-14">
            <Skeleton className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700" />
            <Skeleton className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700" />
            <Skeleton className="h-10 w-full mt-2 bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TopUsersPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
          Top Users
        </h1>
        <p className="text-slate-500 dark:text-slate-400">The top five users with the most commented posts</p>
      </div>

      <Suspense fallback={<TopUsersSkeleton />}>
        <TopUsersContent />
      </Suspense>
    </div>
  )
}
