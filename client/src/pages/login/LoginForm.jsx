import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Apple, Chrome } from "lucide-react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login submitted", { email, password })
  }

  const handleGoogleLogin = () => {
    // Handle Google OAuth login
    console.log("Google login clicked")
  }

  const handleAppleLogin = () => {
    // Handle Apple OAuth login
    console.log("Apple login clicked")
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email and password to login</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button className="w-full mt-6 bg-foreground text-background" type="submit">
            Login
          </Button>
        </form>
        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-muted-foreground">
            Or continue with
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={handleGoogleLogin}>
            {/* <Chrome className="mr-2 h-4 w-4" /> */}
            <i className="fi fi-brands-google translate-y-[1px]"></i>
            Google
          </Button>
          <Button variant="outline" onClick={handleAppleLogin}>
            {/* <Apple className="mr-2 h-4 w-4" /> */}
            <i className="fi fi-brands-apple translate-y-[1px]"></i>
            Apple
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="hover:text-black hover:underline text-blue-500">
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}

