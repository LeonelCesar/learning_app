/* "use client";

import { Mail, Search, User } from "lucide-react";
import { Input } from "./Components/ui/Input";

import type { ButtonProps } from "./Components/button.types";
import { Button } from "./Components/ui/Button";
import { UserList } from "./Components/UserList";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-xl space-y-6 rounded-2xl bg-white p-6 shadow-sm">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Input Component</h1>

          <p className="mt-1 text-sm text-slate-500">
            Componente reutilizável para formulários.
            Dentro do componente, podes adicionar ícones, mensagens de erro, textos de ajuda e muito mais.
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

      <UserList />
    </main>
  );
}
 */


import {
  CartSummary,
  ProductCard,
} from "./Components/cart";

import type { Product } from "../app/src/types/cart.types";

const products: Product[] = [
  {
    id: "product-1",
    name: "Mechanical Keyboard",
    price: 89.9,
  },
  {
    id: "product-2",
    name: "Wireless Mouse",
    price: 49.9,
  },
  {
    id: "product-3",
    name: "USB-C Hub",
    price: 69.9,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 sm:p-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_360px]">
        <section>
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Products
            </h1>

            <p className="mt-1 text-slate-500">
              Select products to add to your cart.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        <CartSummary />
      </div>
    </main>
  );
}