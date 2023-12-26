import { useSession, signOut } from "next-auth/react";
import { useQuery } from "react-query";
import { getLoggedUser, logout } from "@/pages/api/users";
import { useRouter } from "next/router";

export default function Profile() {
  const { data: session } = useSession();
  const { data: user, isLoading, isError } = useQuery("profile", getLoggedUser);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError || (!user && !session)) {
    return <ErrorComponent />;
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1>Welcome, {user ? user.username : session.user.name}!</h1>
        <p>Email: {user ? user.email : session.user.email}</p>
        <button onClick={user ? handleLogout : () => signOut()}>
          Logout
        </button>
      </div>
      <style jsx>{`
        .profile-container {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #6a5acd, #836fff);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-content {
          text-align: center;
          padding: 40px;
          border-radius: 10px;
          background: white;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        h1 {
          color: #333;
          margin-bottom: 15px;
          font-size: 2.5rem;
        }

        p {
          color: #555;
          margin-bottom: 20px;
          font-size: 1.25rem;
        }

        button {
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          font-size: 1rem;
          font-weight: bold;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
}

function LoadingComponent() {
  return (
    <div className="loading">
      Loading...
      <style jsx>{`
        .loading {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #5DADE2;
        }
      `}</style>
    </div>
  );
}

function ErrorComponent() {
  return (
    <div className="error">
      You are not logged in.
      <style jsx>{`
        .error {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #E74C3C;
        }
      `}</style>
    </div>
  );
}
