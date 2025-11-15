import { API_URL } from "../../config";
import type {
  CharacterGetResponse,
  Character as CharacterType,
  Homeworld,
  Species,
} from "../../types";
import axios from "axios";

class CharacterApi {
  async getCharacters(pageUrl?: string | null): Promise<{
    success: boolean;
    data: CharacterGetResponse;
  }> {
    try {
      const url = pageUrl || `${API_URL}/people/`;
      const response = await axios.get(url);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          data: error.response?.data,
        };
      }

      return {
        success: false,
        data: {
          count: 0,
          results: [],
          next: null,
          previous: null,
        },
      };
    }
  }

  async getCharacterById(id: string): Promise<{
    success: boolean;
    data: CharacterType | null;
  }> {
    try {
      const response = await axios.get(`${API_URL}/people/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          data: null,
        };
      }

      return {
        success: false,
        data: null,
      };
    }
  }

  async getHomeworld(url: string): Promise<{
    success: boolean;
    data: Homeworld | null;
  }> {
    try {
      const response = await axios.get(url);
      return {
        success: true,
        data: response.data,
      };
    } catch {
      return {
        success: false,
        data: null,
      };
    }
  }

  async getSpecies(urls: string[]): Promise<{
    success: boolean;
    data: Species[];
  }> {
    try {
      const promises = urls.map((url) => axios.get(url));
      const responses = await Promise.all(promises);
      return {
        success: true,
        data: responses.map((r) => r.data),
      };
    } catch {
      return {
        success: false,
        data: [],
      };
    }
  }
}

export const characterApi = new CharacterApi();
