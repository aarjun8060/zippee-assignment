import { Skeleton } from "../ui/skeleton";

/**
 * @returns CharacterSkeleton component
 * This component is used to display a skeleton loading state for the character cards
 */
const CharacterSkeleton = () => {
    return (
      <div className="w-full flex justify-center items-center">
        <div className="w-11/12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center mt-8 space-x-2">
            {Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={index} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
};

export default CharacterSkeleton;