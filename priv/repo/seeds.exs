# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Pokedex.Repo.insert!(%Pokedex.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

if Code.ensure_compiled?(Pokedex.Pokemons.Species) &&
     Pokedex.Pokemons.Species |> Pokedex.Repo.aggregate(:count, :id) == 0 do
  Enum.each(Jason.decode!(File.read!('priv/repo/pokemons.json')), fn attrs ->
    %Pokedex.Pokemons.Species{}
    |> Pokedex.Pokemons.Species.changeset(attrs)
    |> Pokedex.Repo.insert!()
  end)
end

if Code.ensure_compiled?(Pokedex.Pokemons.Nest) &&
     Pokedex.Pokemons.Nest |> Pokedex.Repo.aggregate(:count, :id) == 0 do
  Enum.each(Jason.decode!(File.read!('priv/repo/tokens.json')), fn nest_data ->
    nest =
      %Pokedex.Pokemons.Nest{}
      |> Pokedex.Pokemons.Nest.changeset(%{id: nest_data["id"], token: nest_data["token"]})
      |> Pokedex.Repo.insert!()

    for species_id <- nest_data["species_ids"] do
      %Pokedex.Pokemons.Nesting{
        nest: nest,
        species_id: species_id,
        probability: :rand.uniform(20) + 1
      }
      |> Pokedex.Repo.insert!()
    end
  end)
end
