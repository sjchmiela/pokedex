defmodule PokedexWeb.Resolvers.Helpers do
  def process_errors(%Ecto.Changeset{} = changeset) do
    Kronky.ChangesetParser.extract_messages(changeset)
    |> Enum.map(fn message ->
      [message: message.message, field: message.field]
    end)
  end

  def process_errors(reason), do: reason
end
