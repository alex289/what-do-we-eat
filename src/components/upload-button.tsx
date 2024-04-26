'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useUploadThing } from '@/lib/uploadthing';

import type { ClientUploadedFileData } from 'uploadthing/types';

type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);
  const [fileUrl, setFileUrl] = useState<ClientUploadedFileData<{
    fileUrl: string;
  }> | null>(null);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    if (!result) {
      return;
    }

    setFileUrl(result[0]!);
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: 'image/*',
    },
    isUploading: $ut.isUploading,
    result: fileUrl,
  };
};

function UploadSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

export function SimpleUploadButton() {
  const { inputProps, result } = useUploadThingInputProps('imageUploader', {
    onUploadBegin() {
      toast.loading('Uploading...', {
        duration: 100000,
        id: 'upload-begin',
      });
    },
    onUploadError() {
      toast.dismiss('upload-begin');
      toast.error('Upload failed');
    },
    onClientUploadComplete() {
      toast.dismiss('upload-begin');
      toast.success('Upload complete!');
    },
  });

  return (
    <div className="mb-2 flex">
      <label htmlFor="upload-button" className="cursor-pointer">
        <UploadSVG />
      </label>
      <input
        id="upload-button"
        type="file"
        className="sr-only"
        {...inputProps}
      />
      <input
        id="imageUrl"
        type="text"
        className="sr-only"
        value={result?.serverData.fileUrl ?? ''}
      />
      <div className="ml-4">{result?.name}</div>
    </div>
  );
}
