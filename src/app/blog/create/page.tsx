"use client";
import React, { useState } from "react";
import {getAuthToken} from '@/utils/cookie-store'

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setUploading(true);
    setError(null);
    setUploadedUrl(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:8000/blog/create", {
        method: "POST",
        headers: {
          'Authorization':`Bearer ${await getAuthToken()}` // Add your token here
        },
        body: formData, // Send raw file
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const responseData = await response.json();
      setUploadedUrl(responseData.url);
    } catch (err:any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold mb-4">Upload a Banner Image</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {uploadedUrl && (
        <div className="mt-4">
          <p className="text-green-500">Upload Successful!</p>
          <img src={uploadedUrl} alt="Uploaded" className="w-64 mt-2 rounded-lg shadow-md" />
        </div>
      )}
    </div>
  );
}
