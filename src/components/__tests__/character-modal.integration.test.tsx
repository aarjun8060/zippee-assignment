import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/test-utils";
import CharacterModal from "../character-modal";
import type { CharacterWithDetails } from "../../types";

describe("CharacterModal Integration Test", () => {
  const mockCharacter: CharacterWithDetails = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    films: [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
      "https://swapi.dev/api/films/3/",
    ],
    species: [],
    starships: ["https://swapi.dev/api/starships/12/"],
    vehicles: ["https://swapi.dev/api/vehicles/14/"],
    homeworld: "https://swapi.dev/api/planets/1/",
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.dev/api/people/1/",
    homeworldDetails: {
      name: "Tatooine",
      terrain: "desert",
      climate: "arid",
      population: "200000",
    },
    speciesDetails: [],
  };

  it("should open modal and display correct character details", () => {
    render(
      <CharacterModal
        character={mockCharacter}
        open={true}
        handleClose={() => {}}
      />
    );

    const nameHeader = screen.getByRole("heading", { name: "Luke Skywalker" });
    expect(nameHeader).toBeInTheDocument();
    expect(nameHeader.tagName).toBe("H2"); // DialogTitle renders as h2

    const heightValue = screen.getByText("1.72 m");
    expect(heightValue).toBeInTheDocument();

    const massValue = screen.getByText("77 kg");
    expect(massValue).toBeInTheDocument();

    const dateAdded = screen.getByText("09-12-2014");
    expect(dateAdded).toBeInTheDocument();

    const filmsCount = screen.getByText("3 film(s)");
    expect(filmsCount).toBeInTheDocument();

    const birthYear = screen.getByText("19BBY");
    expect(birthYear).toBeInTheDocument();

    const homeworldName = screen.getByText("Tatooine");
    expect(homeworldName).toBeInTheDocument();

    const terrain = screen.getByText("desert");
    expect(terrain).toBeInTheDocument();

    const climate = screen.getByText("arid");
    expect(climate).toBeInTheDocument();

    const population = screen.getByText("200000");
    expect(population).toBeInTheDocument();
  });

  it("should display all required fields according to assignment", () => {
    render(
      <CharacterModal
        character={mockCharacter}
        open={true}
        handleClose={() => {}}
      />
    );

    const nameHeader = screen.getByRole("heading", { name: "Luke Skywalker" });
    expect(nameHeader).toBeInTheDocument();

    expect(screen.getByText(/Height/i)).toBeInTheDocument();
    expect(screen.getByText("1.72 m")).toBeInTheDocument();

    expect(screen.getByText(/Mass/i)).toBeInTheDocument();
    expect(screen.getByText("77 kg")).toBeInTheDocument();

    expect(screen.getByText(/Date Added/i)).toBeInTheDocument();
    expect(screen.getByText("09-12-2014")).toBeInTheDocument();

    expect(screen.getByText(/Films/i)).toBeInTheDocument();
    expect(screen.getByText("3 film(s)")).toBeInTheDocument();

    expect(screen.getByText(/Birth Year/i)).toBeInTheDocument();
    expect(screen.getByText("19BBY")).toBeInTheDocument();

    expect(screen.getByText(/Homeworld/i)).toBeInTheDocument();
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    expect(screen.getByText(/Terrain/i)).toBeInTheDocument();
    expect(screen.getByText("desert")).toBeInTheDocument();
    expect(screen.getByText(/Climate/i)).toBeInTheDocument();
    expect(screen.getByText("arid")).toBeInTheDocument();
    expect(screen.getByText(/Population/i)).toBeInTheDocument();
    expect(screen.getByText("200000")).toBeInTheDocument();
  });

  it("should not render modal when character is null", () => {
    const { container } = render(
      <CharacterModal character={null} open={true} handleClose={() => {}} />
    );

    expect(container.firstChild).toBeNull();
  });
});
