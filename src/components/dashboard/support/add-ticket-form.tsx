"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Upload, FileImage } from "lucide-react";
import { useRouter } from "next/navigation";

const getSafeToken = () => {
  if (typeof window === "undefined") return null;
  return (
    sessionStorage.getItem("onboarding_jwt") ||
    localStorage.getItem("onboarding_jwt")
  );
};

export function AddTicketForm() {
  const router = useRouter();

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("General"); // not used in DB
  const [priority, setPriority] = useState("LOW");
  const [description, setDescription] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // =========================
  // FILE HANDLING
  // =========================
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setAttachedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file);
  };

  // =========================
  // SUBMIT FUNCTION (🔥 MAIN)
  // =========================
  const handleSubmit = async () => {
    const token = getSafeToken();
    if (!token) {
      alert("User not authenticated");
      return;
    }

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    try {
      const res = await fetch(`${apiUrl}/ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject,
          message: description, // 🔥 IMPORTANT FIX
          priority,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      router.push("/dashboard/support");
    } catch (err) {
      console.error(err);
      alert("Failed to create ticket");
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 w-full">
      <div className="space-y-6">

        {/* Subject */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
          <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
            Subject
          </label>

          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            className="md:max-w-xl h-11"
          />
        </div>

        {/* Category (UI only) */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
          <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 w-full md:max-w-xl border rounded-lg px-3"
          >
            <option>General</option>
            <option>Technical</option>
            <option>Billing</option>
          </select>
        </div>

        {/* Priority */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-12 pb-6 border-b">
          <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="h-11 w-full md:max-w-xl border rounded-lg px-3"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-12 pb-6 border-b">
          <label className="md:w-40 text-sm font-medium text-gray-700 mb-2 md:mb-0 md:pt-2">
            Description
          </label>

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add Description here"
            className="md:max-w-xl min-h-[120px]"
          />
        </div>

        {/* Attachments (UI only for now) */}
        <div className="flex flex-col md:flex-row md:gap-12 pb-6">
          <label className="md:w-40 text-sm font-medium text-gray-700">
            Attachments
          </label>

          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className="border-dashed border-2 p-6 rounded-lg cursor-pointer"
          >
            <Upload className="mx-auto mb-2" />
            <p className="text-center text-sm">
              Click to upload or drag and drop
            </p>

            {attachedFile && (
              <div className="flex gap-2 mt-3 text-sm">
                <FileImage />
                {attachedFile.name}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          className="bg-[#0C1E35] text-white"
        >
          Submit Ticket
        </Button>
      </div>
    </div>
  );
}