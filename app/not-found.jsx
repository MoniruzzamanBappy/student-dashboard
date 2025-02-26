import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center min-h-screen flex justify-center items-center flex-col">
      <div className="text-4xl  font-extrabold">
        <p>OOPS!</p>
        <p>404 - Page Not Found</p>
      </div>
      <Link className="text-blue-700" href="/">
        Return Home
      </Link>
    </div>
  );
}
