import type { ReactNode } from "react";

type Nome = "home" | "plus" | "search" | "arrow" | "ticket" | "chart" | "trash" | "check" | "building";

const desenhos: Record<Nome, ReactNode> = {
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /><path d="M9 21v-7h6v7" /></>,
  plus: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M12 7v10M7 12h10" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
  arrow: <><path d="M4 12h16m-6-6 6 6-6 6" /></>,
  ticket: <><path d="M4 4h16v5a3 3 0 0 0 0 6v5H4v-5a3 3 0 0 0 0-6z" /><path d="M9 4v16" strokeDasharray="2 3" /></>,
  chart: <><path d="M4 20V11M10 20V4M16 20v-8M22 20V8" /></>,
  trash: <><path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7M10 11v6m4-6v6" /></>,
  check: <path d="m4 12 5 5L20 6" />,
  building: <><path d="M4 21V5h11v16M2 21h20M15 11h5v10M8 9h3M8 13h3M8 17h3" /></>,
};

export default function Icone({ nome, tamanho = 20 }: { nome: Nome; tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {desenhos[nome]}
    </svg>
  );
}
