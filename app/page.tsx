"use client";

import { Mail, Search, User } from "lucide-react";
import { Input } from "./Components/ui/Input";

import type { ButtonProps } from "./Components/button.types";
import { Button } from "./Components/ui/Button";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-xl space-y-6 rounded-2xl bg-white p-6 shadow-sm">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Input Component</h1>

          <p className="mt-1 text-sm text-slate-500">
            Componente reutilizável para formulários.
          </p>
        </header>

        <Input
          label="Nome completo"
          name="fullName"
          placeholder="Leonel César"
          starIcon={<User />}
          helperText="Introduz o teu nome completo."
          autoComplete="name"
          required
          errorMessage={""}
          fullWidth={false}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="leonel@example.com"
          starIcon={<Mail />}
          autoComplete="email"
          errorMessage={""}
          fullWidth={false}
        />

        <Input
          label="Pesquisar"
          name="search"
          type="search"
          placeholder="Pesquisar pacientes..."
          starIcon={<Search />}
          inputSize="lg"
          errorMessage={""}
          fullWidth={false}
        />

        <Input
          label="Email inválido"
          name="invalidEmail"
          type="email"
          defaultValue="email-incorreto"
          errorMessage="Introduz um endereço de email válido."
          fullWidth={false}
        />

        <Input
          label="Campo validado"
          name="validatedField"
          defaultValue="Valor correto"
          variant="success"
          errorMessage={""}
          fullWidth={false}
        />

        <Input
          label="Campo desativado"
          name="disabledField"
          defaultValue="Não editável"
          disabled
          errorMessage={""}
          fullWidth={false}
        />
      </div>

      <Button variant="secondary">Cancelar</Button>
      <Button variant="danger">Eliminar</Button>
      <Button variant="ghost">Ver detalhes</Button>
      <Button loading>A guardar...</Button>
    </main>
  );
}
