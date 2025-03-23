import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Call the login API
      const loginResponse = await axios.post(`${API_BASE_URL}/api/user/login`, {
        email: data.email,
        password: data.password,
      });

      if (loginResponse.data.success) {
        navigate("/collection");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        // Handle errors based on status code
        if (status === 404) {
          setError("email", { type: "manual", message: data.message });
        } else if (status === 401) {
          setError("password", { type: "manual", message: data.message });
        }
      } else {
        console.error("Error during login:", error);
        setError("password", {
          type: "manual",
          message: "Something went wrong. Please try again.",
        });
      }
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            {/* Email Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button
            className="w-full mt-6 bg-foreground text-background"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
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
            <i className="fi fi-brands-google translate-y-[1px]"></i>
            Google
          </Button>
          <Button variant="outline" onClick={handleAppleLogin}>
            <i className="fi fi-brands-apple translate-y-[1px]"></i>
            Apple
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="hover:text-black hover:underline text-blue-500"
          >
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
