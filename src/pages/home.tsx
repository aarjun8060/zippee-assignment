import { useEffect, useCallback, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCharacters,
  getCharacterDetails,
  setSearchQuery,
  setFilters,
  clearFilters,
} from "../redux/slices/character";
import type { RootState, AppDispatch } from "../redux/store/store";
import Header from "../components/global/header";
import CharacterCard from "../components/characer-card";
import CharacterSkeleton from "../components/global/character-skeleton";
import CharactersPagination from "../components/characters-pagination";
import type { CharacterWithDetails } from "../types";
import CharacterModal from "../components/character-modal";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Search, X, SearchX } from "lucide-react";
import Navbar from "../components/global/navbar";
import EmptyState from "../components/global/empty-state";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    characters,
    pagination,
    isLoading,
    error,
    selectedCharacter,
    searchQuery,
    filters,
  } = useSelector((state: RootState) => state.character);
  const [open, setOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [localGenderFilter, setLocalGenderFilter] = useState(
    filters.gender || ""
  );

  const handleCloseCharacterModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleFetchCharacters = useCallback(
    async (pageUrl?: string | null) => {
      try {
        const response = await dispatch(getCharacters(pageUrl));
        if (response && !response.success) {
          console.error("Error fetching characters");
        }
      } catch (error) {
        console.error("Error fetching characters", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    handleFetchCharacters();
  }, [handleFetchCharacters]);

  // Sync local state with Redux state
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLocalGenderFilter(filters.gender || "");
  }, [filters.gender]);

  const handleOpenCharacterModal = useCallback(
    (character: CharacterWithDetails) => {
      dispatch(getCharacterDetails(character));
      setOpen(true);
    },
    [dispatch]
  );

  // Get unique values for filters
  const uniqueGenders = useMemo(() => {
    const genders = new Set<string>();
    characters.forEach((char) => {
      if (char.gender && char.gender !== "n/a" && char.gender !== "unknown") {
        genders.add(char.gender);
      }
    });
    return Array.from(genders);
  }, [characters]);

  // Filter characters based on search and filters
  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      // Search filter
      if (localSearchQuery) {
        const query = localSearchQuery.toLowerCase();
        const matchesSearch =
          character.name.toLowerCase().includes(query) ||
          character.gender?.toLowerCase().includes(query) ||
          character.hair_color?.toLowerCase().includes(query) ||
          character.skin_color?.toLowerCase().includes(query) ||
          character.eye_color?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Gender filter
      if (localGenderFilter && character.gender !== localGenderFilter) {
        return false;
      }

      return true;
    });
  }, [characters, localSearchQuery, localGenderFilter]);

  const handleSearchChange = (value: string) => {
    setLocalSearchQuery(value);
    dispatch(setSearchQuery(value));
  };

  const handleGenderFilterChange = (value: string) => {
    setLocalGenderFilter(value);
    dispatch(setFilters({ gender: value || null }));
  };

  const handleClearFilters = () => {
    setLocalSearchQuery("");
    setLocalGenderFilter("");
    dispatch(clearFilters());
  };

  const hasActiveFilters = localSearchQuery || localGenderFilter;

  if (isLoading) {
    return <CharacterSkeleton />;
  }

  return (
    <div className="bg-background w-full justify-center items-center">
      <Navbar />
      <div className="max-w-11/12 mx-auto">
        <Header
          title="Characters of Star Wars"
          description="Explore the characters of Star Wars universe and their details by clicking on the character card or by searching for a specific character"
        />

        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between md:items-center">
                <div className="flex flex-col gap-2 md:w-3/4">
                  <Label htmlFor="search">Search Characters</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search by name, gender, hair color, skin color, eye color..."
                      value={localSearchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 md:w-1/4">
                  <div className="flex flex-col gap-2 flex-1">
                    <Label htmlFor="gender-filter">Filter by Gender</Label>
                    <select
                      id="gender-filter"
                      value={localGenderFilter}
                      onChange={(e) => handleGenderFilterChange(e.target.value)}
                      className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    >
                      <option value="">All Genders</option>
                      {uniqueGenders.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {hasActiveFilters && (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="clear-filters">Clear Filters</Label>
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="w-full sm:w-auto"
                    >
                      <X className="w-4 h-4" />
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>

              {/* Results Count */}
              {hasActiveFilters && (
                <div className="text-sm text-muted-foreground">
                  Showing {filteredCharacters.length} of {characters.length}{" "}
                  characters
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="text-center text-red-500 mt-4">
            Error fetching characters
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center mt-8">
          {filteredCharacters &&
            Array.isArray(filteredCharacters) &&
            filteredCharacters.length > 0 &&
            filteredCharacters.map((character, number: number) => (
              <CharacterCard
                key={character.name}
                id={number.toString()}
                name={character.name}
                gender={character.gender}
                character={character}
                handleOpenCharacterModal={() =>
                  handleOpenCharacterModal(character)
                }
              />
            ))}
          {filteredCharacters.length === 0 && !isLoading && (
            <EmptyState
              icon={<SearchX className="h-8 w-8" />}
              title="No characters found"
              description="No characters match your search criteria. Try adjusting your filters or search terms."
            />
          )}
        </div>

        <CharacterModal
          character={selectedCharacter as CharacterWithDetails}
          open={open}
          handleClose={handleCloseCharacterModal}
        />

        <CharactersPagination
          totalCount={pagination.count}
          nextPageUrl={pagination.next}
          previousPageUrl={pagination.previous}
          onPageChange={(pageUrl) => handleFetchCharacters(pageUrl)}
        />
      </div>
    </div>
  );
};
export default Home;
