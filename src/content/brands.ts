import type { Brand } from "@/domain/brand";

export const brands = [{ id: "fossibot", name: "FOSSiBOT", slug: "fossibot", website: "https://eu.fossibot.com" }] as const satisfies readonly Brand[];
