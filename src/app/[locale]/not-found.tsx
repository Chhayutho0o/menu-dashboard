import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function NotFoundPage() {
  return (
    <section>
      <div className="px-5 py-16 md:px-10 md:py-20 mt-40">
        <div className="m-auto flex w-full max-w-3xl flex-col items-center text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">404 Error</h1>
          <p className="mx-auto mb-5 max-w-lg text-sm text-gray-500 sm:text-base md:mb-6 lg:mb-8">
            We could not found the page you are looking for. Please try another
            page and verify the URL you have entered.
          </p>
          <Button asChild variant={"link"}>
            <Link
              prefetch={false}
              href="/"
              className="flex gap-2 items-center justify-center"
            >
              <ArrowLeft className="size-5" /> Go back to home page
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
