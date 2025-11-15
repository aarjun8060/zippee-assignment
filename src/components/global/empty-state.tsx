import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

/**
 * @returns EmptyState component
 * This component is used to display an empty state for the character cards
 */
const EmptyState = ({
  icon,
  title,
  description,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "col-span-full flex flex-col items-center justify-center py-12 px-4",
        className
      )}
    >
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground text-center max-w-md">
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyState;
