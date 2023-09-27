import { cn } from "@/lib/utils";

const alert = "relative w-full rounded-lg border p-4 my-4";
export default function ArticleThumbnailCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}) {
  return <div className={cn(alert, className)}>{children}</div>;
}
