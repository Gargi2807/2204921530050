import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                  Social Media Analytics Dashboard
                </h1>
                <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
                  Real-time insights from social media platform data
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 pt-12">
              <Link href="/top-users" className="transform transition-all duration-300 hover:scale-105">
                <Card className="h-full overflow-hidden border-0 bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-80 h-2"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pt-6">
                    <CardTitle className="text-xl font-bold">Top Users</CardTitle>
                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                      <BarChart className="w-5 h-5 text-pink-500 dark:text-pink-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      View the top five users with the most commented posts
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/trending-posts" className="transform transition-all duration-300 hover:scale-105">
                <Card className="h-full overflow-hidden border-0 bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-80 h-2"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pt-6">
                    <CardTitle className="text-xl font-bold">Trending Posts</CardTitle>
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <LineChart className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      Discover posts with the maximum number of comments
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/feed" className="transform transition-all duration-300 hover:scale-105">
                <Card className="h-full overflow-hidden border-0 bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-80 h-2"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 pt-6">
                    <CardTitle className="text-xl font-bold">Live Feed</CardTitle>
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <PieChart className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      See posts in real-time with newest posts at the top
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
