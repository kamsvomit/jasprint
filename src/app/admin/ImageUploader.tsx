'use client';

import React, { useRef, useState } from 'react';
import { uploadFile, deleteFile } from '../../lib/storage';

interface ImageUploaderProps {
  bucket: 'products' | 'blog';
  folder?: string;
  /** multiple = true untuk galeri produk, false untuk cover blog */
  multiple?: boolean;
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
}

export default function ImageUploader({
  bucket,
  folder = '',
  multiple = false,
  value,
  onChange,
  maxFiles = 5,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [dragOver, setDragOver] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    const remaining = maxFiles - value.length;
    if (remaining <= 0) {
      alert(`Maksimal ${maxFiles} foto`);
      return;
    }

    const toUpload = Array.from(files).slice(0, remaining);
    setUploading(true);

    const newUrls: string[] = [];
    for (let i = 0; i < toUpload.length; i++) {
      const file = toUpload[i];
      setUploadProgress(`Mengupload ${i + 1}/${toUpload.length}: ${file.name}`);
      const result = await uploadFile(file, bucket, folder);
      if (result.url) {
        newUrls.push(result.url);
      } else {
        alert(`Gagal upload ${file.name}: ${result.error}`);
      }
    }

    onChange(multiple ? [...value, ...newUrls] : newUrls.slice(0, 1));
    setUploading(false);
    setUploadProgress('');
    if (inputRef.current) inputRef.current.value = '';
  }

  async function handleDelete(url: string) {
    if (!confirm('Hapus foto ini?')) return;
    onChange(value.filter(u => u !== url));
    await deleteFile(bucket, url).catch(() => {});
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  const canAdd = value.length < maxFiles;

  return (
    <div className="space-y-3">
      {/* Preview grid */}
      {value.length > 0 && (
        <div className={`grid gap-2 ${multiple ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-1'}`}>
          {value.map((url, i) => (
            <div key={url} className={`relative group rounded-xl overflow-hidden bg-white/5 border border-white/10 ${multiple ? 'aspect-square' : 'aspect-video'}`}>
              <img src={url} alt="" className="w-full h-full object-cover" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {multiple && i > 0 && (
                  <button
                    onClick={() => {
                      const arr = [...value];
                      [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                      onChange(arr);
                    }}
                    title="Geser kiri"
                    className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-all text-sm"
                  >‹</button>
                )}
                <button
                  onClick={() => handleDelete(url)}
                  title="Hapus"
                  className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
                {multiple && i < value.length - 1 && (
                  <button
                    onClick={() => {
                      const arr = [...value];
                      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                      onChange(arr);
                    }}
                    title="Geser kanan"
                    className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-all text-sm"
                  >›</button>
                )}
              </div>
              {/* Cover badge */}
              {multiple && i === 0 && (
                <span className="absolute top-1.5 left-1.5 text-[9px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded-full">COVER</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      {canAdd && (
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl transition-all cursor-pointer
            ${dragOver ? 'border-red-500 bg-red-500/10' : 'border-white/10 hover:border-white/25 hover:bg-white/[0.03]'}
            ${uploading ? 'cursor-not-allowed opacity-60' : ''}
            ${multiple ? 'p-5' : 'p-6'}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple={multiple}
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
            disabled={uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-white/50 text-xs text-center">{uploadProgress}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-white/50 text-xs font-bold">
                  {dragOver ? 'Lepas file di sini' : 'Klik atau drag & drop foto'}
                </p>
                <p className="text-white/20 text-[10px] mt-0.5">
                  JPG, PNG, WebP · Maks 5MB
                  {multiple && ` · ${value.length}/${maxFiles} foto`}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {!canAdd && (
        <p className="text-white/20 text-[11px] text-center">Maksimal {maxFiles} foto sudah tercapai</p>
      )}
    </div>
  );
}
