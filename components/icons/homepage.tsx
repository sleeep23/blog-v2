import { GlobeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function Homepage() {
  return (
    <Button asChild variant="ghost" size="icon">
      <a href="https://dongho-seo.me" target="_blank">
        <span className="sr-only">Homepage</span>
        <GlobeIcon className="h-4 w-4" />
      </a>
    </Button>
  );
}
