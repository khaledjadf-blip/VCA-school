"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

// Verzendknop die eerst om bevestiging vraagt (in de gekozen taal).
export function ConfirmButton({ question, questionAr, ...props }: ButtonProps & { question: string; questionAr: string }) {
  const { isArabic } = useLanguage();
  return (
    <Button
      type="submit"
      {...props}
      onClick={(event) => {
        if (!window.confirm(isArabic ? questionAr : question)) event.preventDefault();
      }}
    />
  );
}
