import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function Mail() {
  return (
    <Button asChild variant="ghost" size="icon">
      <a href="mailto:ehcws333@gm.gist.ac.kr">
        <span className="sr-only">Email</span>
        <EnvelopeClosedIcon className="h-4 w-4" />
      </a>
    </Button>
  );
}
