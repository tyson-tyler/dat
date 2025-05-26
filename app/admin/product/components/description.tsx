"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface Props {
  data: any;
  handleData: (key: string, value: any) => void;
}

export default function DescriptionEditor({ data, handleData }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: data?.description || "",
    onUpdate: ({ editor }) => {
      handleData("description", editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && data?.description) {
      editor.commands.setContent(data.description);
    }
  }, [editor, data?.description]);

  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl h-full">
      <h1 className="font-semibold">Description</h1>
      <div className="border border-gray-300 rounded-md p-2">
        <EditorContent editor={editor} />
      </div>
    </section>
  );
}
