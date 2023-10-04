import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useSession, signIn } from "next-auth/react";

export default function Login() {

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

useEffect(() => {
  if (session) {
    router.replace("/");
  }
}, [session, router]);

  const handleLogin = async (loginData) => {
    const res = await axios.post("http://localhost:9000/users/login", loginData);
    return res.data;
  };

  const { mutate, isLoading } = useMutation(handleLogin, {
    onSuccess: (data) => {
      Swal.fire("Success", "Successfully login", "success");
      if (!localStorage.getItem("token")) {
        localStorage.setItem("token", data);
        queryClient.setQueryData("getToken", data);
      }
      console.log("success");
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    },
    onError: (err) => {
      Swal.fire("Failed to Login", err.response.data.msg, "error");
    },
});

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (loginData.username.length === 0 || loginData.password.length === 0) {
      Swal.fire("Oops...", `Please fill up all the fields`, "error");
      return;
    }
    mutate(loginData);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-white"
                placeholder="Username"
                onChange={onChangeHandler}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-white"
                placeholder="Password"
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              </span>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          <button
            onClick={() => router.push("/Register")}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Don't have an account?
          </button>
        </p>
        {/* <p className="mt-2 text-center text-sm text-gray-600">Or sign up with</p>
        <div className="flex justify-center mt-2">
            <button
              type="button"
              className="flex items-center justify-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => signIn("google")}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google G Logo" className="h-5 w-5 mr-2" />
              Google
            </button>
        </div> */}
      </div>
    </div>
  );
}
