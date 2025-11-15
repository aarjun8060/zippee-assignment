import { useSelector } from "react-redux";
import Header from "../components/global/header";
import Navbar from "../components/global/navbar";
import type { RootState } from "../redux/store/store";
import CharacterSkeleton from "../components/global/character-skeleton";
import CharacterCard from "../components/characer-card";
import EmptyState from "../components/global/empty-state";
import { Heart } from "lucide-react";

const Favorites = () => {
  const { favorites, isLoading } = useSelector(
    (state: RootState) => state.character
  );

  if (isLoading) {
    return <CharacterSkeleton />;
  }

  return (
    <div className="p-4 bg-background w-full">
      <Navbar />
      <div className="max-w-11/12 mx-auto">
        <Header title="Favorites" description="View your favorite characters" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {favorites && Array.isArray(favorites) && favorites.length > 0 ? (
            favorites.map((favorite, index: number) => (
              <CharacterCard
                key={favorite.url}
                id={index.toString()}
                name={favorite.name}
                gender={favorite.gender}
                character={favorite}
                handleOpenCharacterModal={() => {}}
              />
            ))
          ) : (
            <EmptyState
              icon={<Heart className="h-8 w-8" />}
              title="No favorites yet"
              description="Start exploring characters and add them to your favorites to see them here."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
