import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Twitter() {
  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="https://twitter.com/sleeep23_">
        <svg
          className="h-4 w-4 fill-current"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      </Link>
    </Button>
  );
}
