defmodule Pokedex.Pokemons do
  import Ecto.Query, warn: false
  alias Pokedex.Repo

  alias Pokedex.Pokemons.{Species, Nest, Nesting}

  def get_species!(id), do: Repo.get!(Species, id)

  def get_nest_by_token(token) do
    nest = from(nest in Nest, where: nest.token == ^token) |> Repo.one()
    if nest, do: {:ok, nest}, else: {:error, "No such token"}
  end

  def get_nestings(%Nest{nestings: %Ecto.Association.NotLoaded{}} = nest),
    do: Repo.preload(nest, :nestings) |> get_nestings

  def get_nestings(%Nest{nestings: nestings}), do: nestings

  def draw_nesting(%Nest{} = nest) do
    nest
    |> get_nestings
    |> draw_nesting
    |> Repo.preload(:species)
  end

  def draw_nesting(nestings_list) do
    probabilities_sum =
      nestings_list
      |> Enum.map(fn nesting -> nesting.probability end)
      |> Enum.sum()

    # :rand.uniform(n) gives a random number from 1 <= x <= n
    random = :rand.uniform(probabilities_sum + 1) - 1
    draw_nesting(nestings_list, {random, 0})
  end

  def draw_nesting(
        [%Nesting{probability: probability} = head | tail],
        {random, probability_accumulator}
      ) do
    if random >= probability_accumulator and random <= probability_accumulator + probability do
      head
    else
      draw_nesting(tail, {random, probability_accumulator + probability})
    end
  end
end
