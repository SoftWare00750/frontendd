import { useRef } from "react";
import { Upload } from "lucide-react";

interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName?: string;
}

export default function UploadBox({ onChange, fileName }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
    }
    onChange?.(e); // forward to parent if provided
  };

  return (
    <div
      onClick={handleClick}
      className="border border-gray-300 rounded-xl p-10 text-center bg-white cursor-pointer hover:border-green-700 transition"
    >
      <Upload className="mx-auto text-gray-500 mb-3" />

      {fileName ? (
        <p className="text-sm font-semibold text-green-900">{fileName}</p>
      ) : (
        <>
          <p className="text-sm text-gray-700 font-medium">Tap to upload</p>
          <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
        </>
      )}

      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={fileRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}