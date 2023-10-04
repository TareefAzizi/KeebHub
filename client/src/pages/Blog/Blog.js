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
    <div className="post bg-white shadow-lg rounded p-6 mb-4 max-w-2xl mx-auto">
      <div className="image mb-4">
        <Link href={`/post/${_id}`}>
          <img
            src={`http://localhost:9000/${cover.replace("uploads", "")}`}
            alt=""
            className="w-full h-80 object-cover rounded"
          />
        </Link>
      </div>

      <div className="texts">
        <Link href={`/post/${_id}`}>
          <h2 className="text-2xl font-bold text-black mb-2">{title}</h2>
        </Link>
        <p className="info text-gray-600 mb-4">
          <a className="author font-medium">author: {author.username}</a>
          <br />
          <a>
            <time className="info text-gray-600 mb-4">
              Posted on: {formatISO9075(new Date(createdAt))}
            </time>
          </a>
        </p>
        <p className="summary text-gray-700">{summary}</p>
      </div>
    </div>
  );
}
