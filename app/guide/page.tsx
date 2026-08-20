import { Suspense } from "react";
import { GuideContent } from "@/components/GuideContent";

export default function GuidePage() {
  return (
    <Suspense fallback={null}>
      <GuideContent />
    </Suspense>
  );
}
