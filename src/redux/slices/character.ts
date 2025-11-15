import { createSlice, type Dispatch } from "@reduxjs/toolkit";
import { characterApi } from "../mooks/character";
import type { Character, CharacterWithDetails } from "../../types";

const initialState = {
  characters: [] as Character[],
  selectedCharacter: null as CharacterWithDetails | null,
  pagination: {
    count: 0,
    next: null as string | null,
    previous: null as string | null,
  },
  isLoading: false,
  isLoadingDetails: false,
  error: null as string | null,
  searchQuery: "",
  filters: {
    homeworld: null as string | null,
    film: null as string | null,
    species: null as string | null,
    gender: null as string | null,
  },
  favorites: [] as Character[],
};

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      state.characters = action.payload;
    },
    setSelectedCharacter: (state, action) => {
      state.selectedCharacter = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsLoadingDetails: (state, action) => {
      state.isLoadingDetails = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.searchQuery = "";
      state.filters = {
        homeworld: null,
        film: null,
        species: null,
        gender: null,
      };
    },
    addToFavorites: (state, action) => {
      const character = action.payload;
      const exists = state.favorites.some((fav) => fav.url === character.url);
      if (!exists) {
        state.favorites.push(character);
      }
    },
    removeFromFavorites: (state, action) => {
      const characterUrl = action.payload;
      state.favorites = state.favorites.filter(
        (fav) => fav.url !== characterUrl
      );
    },
    toggleFavorite: (state, action) => {
      const character = action.payload;
      const exists = state.favorites.some((fav) => fav.url === character.url);
      if (exists) {
        state.favorites = state.favorites.filter(
          (fav) => fav.url !== character.url
        );
      } else {
        state.favorites.push(character);
      }
    },
  },
});

export const { reducer } = characterSlice;
const {
  setCharacters,
  setSelectedCharacter,
  setPagination,
  setIsLoading,
  setIsLoadingDetails,
  setError,
  setSearchQuery,
  setFilters,
  clearFilters,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
} = characterSlice.actions;

export const getCharacters =
  (pageUrl?: string | null) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(setError(null));
    try {
      const response = await characterApi.getCharacters(pageUrl);

      if (!response.success) {
        dispatch(setError(response.data));
        return {
          success: false,
        };
      } else {
        dispatch(setCharacters(response.data.results));
        dispatch(
          setPagination({
            count: response.data.count,
            next: response.data.next,
            previous: response.data.previous,
          })
        );
        return {
          success: true,
        };
      }
    } catch (error) {
      console.error("Error fetching characters", error);
      dispatch(setError("Failed to fetch characters"));
      return {
        success: false,
      };
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const getCharacterDetails =
  (character: Character) => async (dispatch: Dispatch) => {
    dispatch(setIsLoadingDetails(true));
    try {
      const characterWithDetails: CharacterWithDetails = { ...character };

      // Fetch homeworld details
      if (character.homeworld) {
        const homeworldResponse = await characterApi.getHomeworld(
          character.homeworld
        );
        if (homeworldResponse.success && homeworldResponse.data) {
          characterWithDetails.homeworldDetails = homeworldResponse.data;
        }
      }

      // Fetch species details
      if (character.species && character.species.length > 0) {
        const speciesResponse = await characterApi.getSpecies(
          character.species
        );
        if (speciesResponse.success) {
          characterWithDetails.speciesDetails = speciesResponse.data;
        }
      }

      dispatch(setSelectedCharacter(characterWithDetails));
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error fetching character details", error);
      return {
        success: false,
      };
    } finally {
      dispatch(setIsLoadingDetails(false));
    }
  };

export const clearSelectedCharacter = () => (dispatch: Dispatch) => {
  dispatch(setSelectedCharacter(null));
};

export {
  setSearchQuery,
  setFilters,
  clearFilters,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
};

export default characterSlice;
