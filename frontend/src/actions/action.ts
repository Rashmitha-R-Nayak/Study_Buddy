"use server";

import { fetchWithAuth } from "@/lib/api";
import { useCheckLogin } from "@/lib/userCheckLogin";
import { revalidatePath } from "next/cache";

export async function fileUpload(formData: FormData) {
  const { user, userId } = useCheckLogin();
  const file = formData.get("file") as File;
  if (!file) {
    console.log("No file Selected");
    return;
  }
  const form = new FormData();
  form.append("file", file);
  form.append("user", userId);
  try {
    const res = await fetchWithAuth("/pdfs/", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    console.log("File Uploaded Successfully", data);
    revalidatePath("/chat");
  } catch (error) {
    console.log("Failed to upload file", error);
  }
}
