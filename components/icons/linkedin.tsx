import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function LinkedIn() {
  return (
    <Button asChild variant="ghost" size="icon">
      <a
        href="https://www.linkedin.com/in/dongho-seo-958b00234/"
        target="_blank"
      >
        <span className="sr-only">LinkedIn</span>
        <LinkedInLogoIcon className="h-4 w-4" />
      </a>
    </Button>
  );
}
