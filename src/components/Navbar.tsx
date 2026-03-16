"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="text-xl font-bold text-gray-900">Agent Mart</span>
            <span className="hidden sm:inline-block text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
              AI-Agent Friendly
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Products
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Dashboard
            </Link>
            <Link href="/orders/track" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Track Order
            </Link>
            <Link
              href="/api-docs"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
            >
              API Docs
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/products" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
            <Link href="/dashboard" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
            <Link href="/orders/track" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg" onClick={() => setMenuOpen(false)}>
              Track Order
            </Link>
            <Link href="/api-docs" className="block px-3 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg" onClick={() => setMenuOpen(false)}>
              API Docs
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
