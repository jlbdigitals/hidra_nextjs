"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm font-bold text-[#7A7A7A] hover:text-[#53B94A] transition-colors mb-6 group"
    >
      <div className="w-8 h-8 rounded-full border border-[#e0e0e0] flex items-center justify-center group-hover:border-[#53B94A] group-hover:bg-[#F3F8F3] transition-all">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <span>VOLVER</span>
    </button>
  );
}
