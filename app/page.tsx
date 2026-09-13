"use client";

import { useState } from "react";
import { Modal } from "./Components/modal";
import { Avatar } from "./Components/avatar";

import { SearchableSelect } from "./Components/SearchableSelect";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Open modal
      </button>

      <Modal
        isOpen={isOpen}
        title="Delet patient"
        description="This action cannot be undone."
        onClose={() => setIsOpen(false)}
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700"
            >
              Cancel
            </button>

            <button
              type="button"
              className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-slate-700">
          Are you sure you want to delete this patient?
        </p>
      </Modal>

      <div className="flex flex-wrap items-center gap-6">
        <Avatar
          name="Leonel César"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
          size="lg"
          status="online"
          showStatus
          alt={""}
        />

        <Avatar
          name="Ana Silva"
          size="md"
          status="busy"
          showStatus
          src={""}
          alt={""}
        />

        <Avatar
          name="Carlos Mendes"
          size="xl"
          status="away"
          showStatus
          src={""}
          alt={""}
        />

        <Avatar
          name="Maria Oliveira"
          size="sm"
          src={""}
          alt={""}
          status={"online"}
        />
      </div>

      <SearchableSelect
        label="Select an option"
        placeholder="Choose an option"
        searchPlaceholder="Search..."
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ]}
        value={undefined}
        onChange={(value, option) => {
          console.log("value:", value);
          console.log("option:", option);
        }}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
      />
    </main>
  );
}
