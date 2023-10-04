import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function Editor({ value, onChange }) {
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquite",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  return (
    <div className="content text-black">
      <ReactQuill
        value={value}
        theme={"snow"}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
