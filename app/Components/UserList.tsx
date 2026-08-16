"use clirnt";

import type { User } from "../src/types/user.types";
import { useState, useEffect } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        setIsloading(true);
        setError(null);

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: User[] = await response.json();

        setUsers(data);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (error instanceof Error) {
          setError(error.message);
          return;
        }

        setError("An unexpected error occurred.");
      } finally {
        setIsloading(false);
      }
    }

    void fetchUsers();

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return (
      <section
        className="rounded-xl border border-slste-200 bg-white p-6"
        aria-busy="true"
      >
        <p className="text-sm text-slate-500">Loading useres...</p>

        <p className="mt-2 text-sm text-red-600">{error}</p>
      </section>
    );
  }

  if (users.length === 0) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">No user found</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-xl font-semibold text-slate-900">Users</h2>
        <p className="mt-1 text-sm text-slate-500">User loaded from API</p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <h3 className="font-semibold text-slate-900">@{user.name}</h3>
            <p className="mt-1 text-sm text-slate-500">@{user.username}</p>
            <a
              href={`mailto:${user.email}`}
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              {user.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
