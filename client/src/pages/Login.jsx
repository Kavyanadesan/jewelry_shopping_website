import LoginForm from "./login/LoginForm"

function Login() {
  return (
    <div className="flex items-center justify-center py-20 bg-gray-100">
      <div className="w-full max-w-md bg-background">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login