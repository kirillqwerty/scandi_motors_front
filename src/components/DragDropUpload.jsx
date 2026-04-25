import { useState, useRef, useCallback } from "react";
import { Upload, X, Image, Loader2, Plus } from "lucide-react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function DragDropUpload({
  value,
  onChange,
  token,
  testId = "image-upload",
  multiple = false,
  maxFiles = 3,
}) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const values = multiple ? (Array.isArray(value) ? value : []) : [];

  const uploadSingleFile = useCallback(
    async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      const headers = { "Content-Type": "multipart/form-data" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await axios.post(`${BACKEND_URL}/api/upload`, formData, {
        headers,
      });
      return `${BACKEND_URL}${res.data.url}`;
    },
    [token],
  );

  const uploadFiles = useCallback(
    async (fileList) => {
      const files = Array.from(fileList || []);
      if (!files.length) return;

      const availableSlots = multiple ? maxFiles - values.length : 1;
      const filesToUpload = files.slice(0, availableSlots);

      if (availableSlots <= 0) {
        setError(`Можно загрузить максимум ${maxFiles} фото`);
        return;
      }

      const hasInvalidFile = filesToUpload.some(
        (file) => !file.type.startsWith("image/"),
      );
      if (hasInvalidFile) {
        setError("Можно загружать только изображения");
        return;
      }

      setError("");
      setUploading(true);

      try {
        const uploadedUrls = [];
        for (const file of filesToUpload) {
          const url = await uploadSingleFile(file);
          uploadedUrls.push(url);
        }

        if (multiple) {
          onChange([...values, ...uploadedUrls].slice(0, maxFiles));
        } else {
          onChange(uploadedUrls[0] || "");
        }
      } catch (e) {
        console.error("Upload failed:", e);
        setError("Ошибка загрузки");
      } finally {
        setUploading(false);
      }
    },
    [maxFiles, multiple, onChange, uploadSingleFile, values],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      uploadFiles(e.dataTransfer.files);
    },
    [uploadFiles],
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = (e) => {
    uploadFiles(e.target.files);
    e.target.value = "";
  };

  const handleRemoveSingle = (e) => {
    e.stopPropagation();
    onChange("");
  };

  const handleRemoveFromList = (e, indexToRemove) => {
    e.stopPropagation();
    onChange(values.filter((_, index) => index !== indexToRemove));
  };

  if (!multiple && value) {
    return (
      <div data-testid={testId} className="relative group">
        <div className="relative overflow-hidden border border-white/10 bg-brand-surface">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-40 object-cover"
            data-testid={`${testId}-preview`}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemoveSingle}
              data-testid={`${testId}-remove`}
              className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-testid={testId} className="space-y-3">
      {multiple && values.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {values.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative group border border-white/10 bg-brand-surface overflow-hidden"
            >
              <img
                src={url}
                alt={`Фото ${index + 1}`}
                className="w-full h-28 object-cover"
                data-testid={`${testId}-preview-${index}`}
              />
              <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5">
                {index + 1}
              </div>
              <button
                type="button"
                onClick={(e) => handleRemoveFromList(e, index)}
                data-testid={`${testId}-remove-${index}`}
                className="absolute top-1 right-1 p-1 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {(!multiple || values.length < maxFiles) && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          data-testid={`${testId}-dropzone`}
          className={`
            border-2 border-dashed cursor-pointer transition-all duration-200
            flex flex-col items-center justify-center p-8 gap-3
            ${
              dragging
                ? "border-brand-gold bg-brand-gold/5"
                : "border-white/15 hover:border-white/30 bg-transparent"
            }
            ${uploading ? "pointer-events-none opacity-60" : ""}
          `}
        >
          {uploading ? (
            <>
              <Loader2 size={28} className="text-brand-gold animate-spin" />
              <p className="text-xs text-zinc-400">Загрузка...</p>
            </>
          ) : (
            <>
              {dragging ? (
                <Image size={28} className="text-brand-gold" />
              ) : multiple && values.length > 0 ? (
                <Plus size={28} className="text-zinc-500" />
              ) : (
                <Upload size={28} className="text-zinc-500" />
              )}
              <p className="text-xs text-zinc-400 text-center">
                {dragging
                  ? "Отпустите файл"
                  : multiple
                    ? `Перетащите фото или нажмите для выбора. Загружено ${values.length}/${maxFiles}`
                    : "Перетащите JPG сюда или нажмите для выбора"}
              </p>
            </>
          )}
        </div>
      )}

      {error && (
        <p
          className="text-xs text-red-400 mt-1"
          data-testid={`${testId}-error`}
        >
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
        data-testid={`${testId}-input`}
      />
    </div>
  );
}
