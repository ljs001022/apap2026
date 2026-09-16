'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/ko/');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-white font-mono text-xs">
      <meta httpEquiv="refresh" content="0;url=/ko/" />
      <p>Redirecting to APAP8...</p>
    </div>
  );
}
