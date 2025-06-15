'use client'

import { useState } from 'react'

type Props = {
  onSelect: (file: File) => void
}

export default function ImageUploader({ onSelect }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setPreviewUrl(URL.createObjectURL(file))
    onSelect(file)
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleSelect}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-32 h-32 object-cover rounded border"
        />
      )}
    </div>
  )
}
