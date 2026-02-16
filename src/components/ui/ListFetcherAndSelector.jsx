import OptionList from "@/components/ui/Form/OptionList";
import { useQuery } from "@tanstack/react-query";

export default function ListFetcherAndSelector({
  selectTheme,
  fetchKeys,
  fetchfunction,
  optionMapper,
  onSelection,
  onError,
}) {
  const { status, data, error } = useQuery({
    queryKey: fetchKeys,
    queryFn: fetchfunction,
  });

  switch (status) {
    case "error":
      onError(error);
      return undefined;
    case "success":
      if (data instanceof Array)
        return (
          <OptionList
            options={data.map(optionMapper)}
            selectTheme={selectTheme}
            onSelect={(option) => {
              onSelection(option.value, option.label);
            }}
          />
        );
      else return undefined;
    case "pending":
      //TODO: handle query pending
      return undefined;
  }
}
