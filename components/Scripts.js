import Script from "next/script";
import { useConfig } from "@/lib/config";
import { Analytics } from "@vercel/analytics/react";

const Scripts = () => {
  const BLOG = useConfig();

  return (
    <>
      <Analytics />
    </>
  );
};

export default Scripts;
