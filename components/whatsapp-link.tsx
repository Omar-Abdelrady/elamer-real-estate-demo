import { whatsappHref } from "@/lib/site-content";

type WhatsAppLinkProps = {
  label: string;
  message?: string;
  variant?: "solid" | "text" | "outline";
  className?: string;
};

export function WhatsAppLink({ label, message, variant = "solid", className = "" }: WhatsAppLinkProps) {
  return (
    <a
      className={`whatsapp-link whatsapp-link--${variant} ${className}`.trim()}
      href={whatsappHref(message)}
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} عبر واتساب`}
    >
      <span>{label}</span>
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
        <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
