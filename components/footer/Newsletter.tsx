import { useSignal } from "@preact/signals";
import { Runtime } from "deco-sites/fashion/runtime.ts";
import type { JSX } from "preact";

const subscribe = Runtime.create(
  "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
);

function Newsletter() {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;

      await subscribe({ email, name });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="flex flex-col gap-6 sm:gap-20 max-w-[1120px] mx-auto">
      <div class="flex flex-col gap-2 max-w-[740px]">
        <span class="font-medium text-2xl text-primary">
          Ganhe 10% off na primeira compra, e fique por dentro das nossas
          novidades e promoções
        </span>
      </div>
      <form
        class="font-body text-body w-full form-control"
        onSubmit={handleSubmit}
      >
        <div class="flex justify-between mb-[52px]">
          <input
            name="name"
            class="flex-grow input py-6 max-w-[328px] h-[52px] placeholder:text-secondary text-secondary text-base font-semibold bg-[#FFF5E1]"
            placeholder="Seu nome"
          />
          <input
            name="email"
            class="flex-grow input py-6 max-w-[328px] h-[52px] placeholder:text-secondary text-secondary text-base font-semibold bg-[#FFF5E1]"
            placeholder="Seu e-mail"
          />
          <input
            name="birthday"
            class="flex-grow input py-6 max-w-[328px] h-[52px] placeholder:text-secondary text-secondary text-base font-semibold bg-[#FFF5E1]"
            placeholder="Data de nascimento (opcional)"
          />
        </div>
        <button
          class="btn disabled:loading w-[204px] rounded-[32px] bg-secondary border-secondary text-xl normal-case text-white mx-auto"
          disabled={loading}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
