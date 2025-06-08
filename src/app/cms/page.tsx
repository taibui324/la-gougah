import { Metadata } from "next";
import CMSPageClient from "./cms-page-client";

export const metadata: Metadata = {
  title: "La Gougah CMS - Login",
  description: "Content Management System for La Gougah",
};

export default function CMSPage() {
  return <CMSPageClient />;
}
