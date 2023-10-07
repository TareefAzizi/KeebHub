import { formatISO9075 } from "date-fns";
import Link from "next/link";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="post bg-white shadow-md rounded p-6 mb-6 max-w-2xl mx-auto hover:shadow-lg transition-shadow duration-300">
      <div className="image mb-4 overflow-hidden rounded">
        <Link href={`/post/${_id}`}>
          <img
            src={`http://localhost:9000/${cover.replace("uploads", "")}`}
            alt="Post cover image"
            className="w-full h-80 object-cover transform transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>

      <div className="texts">
        <Link href={`/post/${_id}`}>
          <h2 className="text-3xl font-semibold text-black mb-2 hover:text-gray-700 transition-colors duration-300 cursor-pointer">
            {title}
          </h2>
        </Link>
        <p className="info text-gray-600 mb-4">
          <span className="author font-medium text-gray-800">
            author: {author.username}
          </span>
          <br />
          <time className="text-gray-500">
            Posted on: {formatISO9075(new Date(createdAt))}
          </time>
        </p>
        <p className="summary text-gray-700">{summary}</p>
      </div>
    </div>
  );
}
