import { Input, Button } from "react-daisyui";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { register } from "../api/users";
import { useMutation } from "react-query";
import { useRouter } from "next/router";

export default function Register() {
  const [user, setUser] = useState({});
  const router = useRouter();

  const onChangeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const { mutate, isLoading } = useMutation(register, {
    onSuccess: () => {
      Swal.fire({
        title: "Registered Successfully",
        text: "Registration was successful!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Go to Login",
      })
        .finally(() => router.push("/Login"))
        .then((res) => {
          if (res.isConfirmed) router.push("/Login");
        });
    },
    onError: (error) => {
      Swal.fire(
        "Failed to register",
        error.response?.data.msg || "Unknown error",
        "error"
      );
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (user.password !== user.password2) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password does not match!",
      });
    } else {
      mutate(user);
    }
  };

  return (
    <div className="grid grid-cols-12 register-page min-h-screen content-center ">
      <div className="sm:col-start-5 sm:col-span-4 col-span-10 col-start-2 ">
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <Input
              className="w-full text-white"
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4 text-white">
            <Input
              className="w-full"
              type="text"
              placeholder="Username"
              name="username"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4 text-white">
            <Input
              className="w-full"
              type="email"
              placeholder="Email"
              name="email"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4 text-white">
            <Input
              className="w-full"
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-4">
            <Input
              className="w-full text- text-white"
              type="password"
              placeholder="Confirm Password"
              name="password2"
              onChange={onChangeHandler}
            />
          </div>
          <Button className="block w-full">Register</Button>
        </form>
      </div>
    </div>
  );
}
