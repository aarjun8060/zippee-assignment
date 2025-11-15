import type { CharacterWithDetails } from "../types";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Card, CardContent } from "./ui/card";
import {
  getGenderIcon,
  getGenderColor,
  formatDateAdded,
  convertHeightToMeters,
} from "../lib/character-utils";

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) => {
  if (!value || value === "n/a" || value === "unknown") return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
};

/**
 * @returns CharacterModal component
 * This component is used to display a character modal with the character details
 */
const CharacterModal = ({
  character,
  open,
  handleClose,
}: {
  character: CharacterWithDetails | null;
  open: boolean;
  handleClose: () => void;
}) => {
  if (!character) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{character.name}</DialogTitle>
          <DialogDescription>
            Detailed information about this Star Wars character
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          {/* Character Image */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
            <img
              src={`https://picsum.photos/id/${character.url
                .split("/")
                .filter(Boolean)
                .pop()}/400`}
              alt={character.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://via.placeholder.com/400x400?text=${encodeURIComponent(
                  character.name
                )}`;
              }}
            />
            <div className="absolute top-3 right-3">
              <span
                className={`inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm ${getGenderColor(
                  character.gender
                )}`}
              >
                {getGenderIcon(character.gender)}
              </span>
            </div>
          </div>

          <Separator />

          {/* Basic Information */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Name" value={character.name} />
                <InfoRow
                  label="Gender"
                  value={character.gender === "n/a" ? "N/A" : character.gender}
                />
                <InfoRow
                  label="Height"
                  value={convertHeightToMeters(character.height)}
                />
                <InfoRow
                  label="Mass"
                  value={
                    character.mass !== "unknown" ? `${character.mass} kg` : null
                  }
                />
                <InfoRow label="Hair Color" value={character.hair_color} />
                <InfoRow label="Skin Color" value={character.skin_color} />
                <InfoRow label="Eye Color" value={character.eye_color} />
                <InfoRow label="Birth Year" value={character.birth_year} />
                <InfoRow
                  label="Date Added"
                  value={formatDateAdded(character.created)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Homeworld Information */}
          {character.homeworldDetails && (
            <>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Homeworld</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoRow
                      label="Planet Name"
                      value={character.homeworldDetails.name}
                    />
                    <InfoRow
                      label="Terrain"
                      value={character.homeworldDetails.terrain}
                    />
                    <InfoRow
                      label="Climate"
                      value={character.homeworldDetails.climate}
                    />
                    <InfoRow
                      label="Population"
                      value={character.homeworldDetails.population}
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Species Information */}
          {character.speciesDetails && character.speciesDetails.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Species</h3>
                <div className="flex flex-wrap gap-2">
                  {character.speciesDetails.map((species, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-primary/10 text-primary"
                    >
                      {species.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">
                Additional Information
              </h3>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Films
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {character.films?.length || 0} film(s)
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Starships
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {character.starships?.length || 0} starship(s)
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Vehicles
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {character.vehicles?.length || 0} vehicle(s)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button onClick={handleClose} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterModal;
