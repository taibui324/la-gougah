import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface UploadResult {
  url: string;
  storageId: string;
}

interface UseStorageReturn {
  generateUploadUrl: () => Promise<string>;
  upload: (options: { url: string; file: File }) => Promise<UploadResult>;
  isLoading: boolean;
}

export function useStorage(): UseStorageReturn {
  const [isLoading, setIsLoading] = useState(false);
  const generateUploadUrlMutation = useMutation(api.http.generateUploadUrl);

  const generateUploadUrl = async () => {
    return await generateUploadUrlMutation({});
  };

  const upload = async ({
    url,
    file,
  }: { url: string; file: File }): Promise<UploadResult> => {
    setIsLoading(true);
    try {
      // Upload the file to the generated URL
      const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { storageId } = await result.json();
      if (!storageId) throw new Error("Failed to upload file");

      // Get the URL for the uploaded file
      const fileUrl = `${window.location.origin}/api/storage/${storageId}`;

      return {
        url: fileUrl,
        storageId,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateUploadUrl,
    upload,
    isLoading,
  };
}
