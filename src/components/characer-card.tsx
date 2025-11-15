import type { Gender, Character } from "../types";
import { Button } from "./ui/button";
import { Eye, Heart } from "lucide-react";
import { getGenderIcon, getGenderColor } from "../lib/character-utils";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store/store";
import { toggleFavorite } from "../redux/slices/character";

interface CharacterCardProps {
  id: string;
  name: string;
  gender: Gender;
  character: Character;
  handleOpenCharacterModal: () => void;
}

const CharacterCard = ({
  id,
  name,
  gender,
  character,
  handleOpenCharacterModal,
}: CharacterCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(
    (state: RootState) => state.character.favorites
  );

  const isFavorite = favorites.some((fav) => fav.url === character.url);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(character));
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20">
      {/* Image Container */}
      <div className="relative h-72 w-full overflow-hidden bg-linear-to-br from-muted to-muted/50">
        <img
          src={`https://picsum.photos/id/${id}/200`}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          onError={(e) => {
            // Fallback to a placeholder if image fails to load
            e.currentTarget.src = `https://via.placeholder.com/400x400?text=${encodeURIComponent(
              name
            )}`;
          }}
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Gender Badge - Positioned on Image */}
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <span
            className={`inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm transition-all duration-300 ${getGenderColor(
              gender
            )} group-hover:scale-110`}
            title={gender}
          >
            {getGenderIcon(gender)}
          </span>
          <button
            onClick={handleToggleFavorite}
            className={`inline-flex items-center justify-center rounded-full border p-2 text-xs font-semibold shadow-lg backdrop-blur-sm transition-all duration-300 ${
              isFavorite
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700"
                : "bg-white/50 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            } group-hover:scale-110 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30 dark:hover:text-red-400`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-1">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Gender
            </span>
            <span className="text-sm font-medium text-foreground capitalize">
              {gender === "n/a" ? "N/A" : gender}
            </span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-auto pt-2">
          <Button
            onClick={handleOpenCharacterModal}
            className="w-full group/btn"
            variant="outline"
          >
            <Eye className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
            <span>View Details</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
