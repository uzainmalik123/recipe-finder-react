import type { ErrorComponentProps } from "@/types/properties.types";

import { Button } from "./ui/button";

const ErrorComponent = ({
  componentName,
  componentError,
  onRetry,
  retryFetch
}: ErrorComponentProps) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg">
      <div className="text-red-600 text-center mb-4">
        <p className="font-semibold text-lg mb-2">
          Failed to load {componentName}
        </p>
        <p className="text-sm">{componentError}</p>
      </div>
      <Button
        onClick={() => {
          onRetry(null);
          retryFetch((prev: boolean) => !prev)
        }}
        variant="outline"
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorComponent;
