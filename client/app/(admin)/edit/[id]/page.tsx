'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/lib/url";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [url, setUrl] = useState<string>("");

  useEffect(()=> {
    const url = `${BASE_URL}/agent/${id}`
    setUrl(url)
  }, [id])

  return (
    <div className="px-0 md:p-10 m-2">
      <div className="md:sticky md:top-0 z-50 mb-2 sm:max-w-sm ml-auto space-y-2 md-border p-5 rounded-lg bg-white ">
        <h2 className="text-sm text-black font-bold">Link</h2>
        <p className="text-sm text-black italic ">
          Use this link to access the agent from any environment
        </p>
      </div>
      <div className="flex items-center space-x-4">
      <Link href={url} className="cursor-pointer  hover:opacity-50">
        <Input value={url} readOnly className="cursor-pointe text-black bg-white" />
      </Link>
      <Button
      size={'sm'}
      className="px-3"
      onClick={()=> navigator.clipboard.writeText(url)}
      > <span className="sr-only">Copy</span>
        <ClipboardCopyIcon className="h-4 w-4" />
      </Button>
      </div>
    </div>
  );
}
