"use client";
import React, { useState } from "react";
import { Send, Share2 } from "lucide-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function Share({
  blogid,
  title,
}: {
  blogid: string;
  title: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shareUrl = `https://blogify-pro.vercel.app/blog/read/${blogid}`;
  const message = `${title}: ${shareUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(
    title
  )}&body=${encodeURIComponent(message)}`;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Share Button */}
      <button
        onClick={openModal}
        className="flex items-center gap-2 px-3 py-1 border rounded-full hover:border-amber-400 cursor-pointer"
      >
        <Share2 size={15} />
        <span>Share</span>
      </button>

      {/* Share Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className=" backdrop-blur-xl p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Share</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {/* WhatsApp */}
              <Link
                href={whatsappUrl}
                rel="noopener noreferrer"
                className="w-full"
              >
                <div className="w-full px-4 py-2 flex gap-2 border rounded-md items-center cursor-pointer hover:border-amber-400">
                  <Send size={15} />
                  <p>Share on WhatsApp</p>
                </div>
              </Link>

              {/* Email */}
              <Link href={gmailUrl} target="_blank" className="w-full">
                <div className="w-full px-4 py-2 flex gap-2 border rounded-md items-center cursor-pointer  hover:border-amber-400">
                  <Send size={15} />
                  <p>Share via Email</p>
                </div>
              </Link>

              {/* Copy Link */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast.dismiss();
                  toast.error("Link coppied", {
                    icon: "✅",
                  });
                }}
                className="w-full px-4 py-2 flex gap-2 border rounded-md items-center cursor-pointer hover:border-amber-400"
              >
                <Send size={15} />
                <p>Copy Link</p>
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster position="bottom-center" />
    </>
  );
}
