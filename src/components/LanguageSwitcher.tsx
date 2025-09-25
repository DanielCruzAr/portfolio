"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const { locale } = useParams() as { locale: string };
  const pathname = usePathname();

  const otherLocale = locale === "en" ? "es" : "en";

  // remove the current locale segment, then add the other
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return <Link href={newPath}>{otherLocale.toUpperCase()}</Link>;
}
