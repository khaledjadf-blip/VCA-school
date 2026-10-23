import { company } from "@/lib/company";

// Zwevende WhatsApp-knop (rechtsonder; in het Arabisch automatisch linksonder).
export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${company.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ons"
      className="fixed bottom-5 end-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#154273] print:hidden"
    >
      <svg viewBox="0 0 32 32" aria-hidden className="h-8 w-8 fill-current">
        <path d="M16.01 3C8.83 3 3 8.82 3 15.99c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75a12.96 12.96 0 0 0 6.33 1.62h.01C23.18 28.87 29 23.05 29 15.88 29 8.82 23.18 3 16.01 3Zm0 23.68h-.01a10.8 10.8 0 0 1-5.5-1.5l-.4-.23-3.96 1.04 1.06-3.86-.26-.4a10.74 10.74 0 0 1-1.65-5.74c0-5.94 4.84-10.78 10.79-10.78 5.94 0 10.73 4.84 10.73 10.67 0 5.95-4.84 10.8-10.8 10.8Zm5.92-8.08c-.32-.16-1.92-.95-2.22-1.06-.3-.11-.51-.16-.73.16-.21.32-.84 1.06-1.03 1.27-.19.22-.38.24-.7.08-.32-.16-1.37-.5-2.6-1.6-.96-.86-1.61-1.92-1.8-2.24-.19-.32-.02-.49.14-.65.15-.15.32-.38.48-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.69 0 1.59 1.16 3.12 1.32 3.34.16.21 2.28 3.48 5.53 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.03.13.62-.09 1.92-.78 2.19-1.54.27-.76.27-1.41.19-1.54-.08-.14-.29-.22-.62-.38Z" />
      </svg>
    </a>
  );
}
