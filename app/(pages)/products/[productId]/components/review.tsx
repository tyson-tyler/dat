"use client";

import { useAuth } from "@/context/authcontext";
import { useReviews } from "@/lib/firebase/reviews/read";
import { deleteReview } from "@/lib/firebase/reviews/write";
import { useUser } from "@/lib/firebase/user/read";
import { Rating } from "@mui/material";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Reviews({ productId }: { productId: string }) {
  const { data } = useReviews({ productId });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { data: userData } = useUser({ uid: user?.uid });

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your review?")) return;
    setIsLoading(true);
    try {
      if (!user) throw new Error("Please log in first.");
      await deleteReview({ uid: user.uid, productId });
      toast.success("Review deleted.");
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong.");
    }
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mx-auto p-4 sm:p-6 rounded-2xl border border-gray-200 bg-white shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Customer Reviews
      </h2>

      <div className="space-y-6">
        <AnimatePresence>
          {data?.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 text-sm text-center"
            >
              No reviews yet. Be the first to leave one!
            </motion.p>
          )}
          {data?.map((item) => (
            <motion.div
              key={item.uid}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-4"
            >
              {/* Avatar */}
              <div className="shrink-0">
                <Image
                  width={48}
                  height={48}
                  className="rounded-full object-cover w-12 h-12"
                  src={item?.photoURL || "/user.avif"}
                  alt="User avatar"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {item?.displayName}
                    </h3>
                    <Rating value={item?.rating} readOnly size="small" />
                  </div>

                  {user?.uid === item?.uid && (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      disabled={isLoading}
                      onClick={handleDelete}
                      className="text-gray-400 hover:text-red-500 cursor-pointer transition"
                      aria-label="Delete review"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  )}
                </div>

                <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
                  {item?.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
