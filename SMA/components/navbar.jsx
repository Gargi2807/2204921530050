"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 shadow-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Social Media Analytics
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/top-users"
              className={cn(
                "flex items-center transition-colors hover:text-pink-500 dark:hover:text-pink-400",
                pathname === "/top-users" ? "text-pink-500 dark:text-pink-400" : "text-slate-600 dark:text-slate-300",
              )}
            >
              <BarChart className="mr-2 h-4 w-4" />
              <span>Top Users</span>
            </Link>
            <Link
              href="/trending-posts"
              className={cn(
                "flex items-center transition-colors hover:text-purple-500 dark:hover:text-purple-400",
                pathname === "/trending-posts"
                  ? "text-purple-500 dark:text-purple-400"
                  : "text-slate-600 dark:text-slate-300",
              )}
            >
              <LineChart className="mr-2 h-4 w-4" />
              <span>Trending Posts</span>
            </Link>
            <Link
              href="/feed"
              className={cn(
                "flex items-center transition-colors hover:text-indigo-500 dark:hover:text-indigo-400",
                pathname === "/feed" ? "text-indigo-500 dark:text-indigo-400" : "text-slate-600 dark:text-slate-300",
              )}
            >
              <PieChart className="mr-2 h-4 w-4" />
              <span>Feed</span>
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center md:hidden">
            <Link
              href="/top-users"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
                pathname === "/top-users"
                  ? "bg-pink-100 text-pink-500 dark:bg-pink-900/30 dark:text-pink-400"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
              )}
            >
              <BarChart className="h-5 w-5" />
              <span className="sr-only">Top Users</span>
            </Link>
            <Link
              href="/trending-posts"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
                pathname === "/trending-posts"
                  ? "bg-purple-100 text-purple-500 dark:bg-purple-900/30 dark:text-purple-400"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
              )}
            >
              <LineChart className="h-5 w-5" />
              <span className="sr-only">Trending Posts</span>
            </Link>
            <Link
              href="/feed"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
                pathname === "/feed"
                  ? "bg-indigo-100 text-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
              )}
            >
              <PieChart className="h-5 w-5" />
              <span className="sr-only">Feed</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
