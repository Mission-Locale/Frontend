import { useEffect, useState } from "react";
import TextInput from "@/components/ui/Form/InputText";
import ListFetcherAndSelector from "@/components/ui/ListFetcherAndSelector";

export default function QueryInput({
  label,
  placeholder,
  selectTheme,
  required,
  disabled,
  fetchKey,
  fetchfunction,
  optionMapper,
  onSelection,
}) {
  const [value, setValue] = useState("");
  const [id, setId] = useState(null);
  const [fetchQuery, setFetchQuery] = useState(null);
  const [error, setError] = useState(null);

  function handleInput(value) {
    setValue(value);
    setId(null);
  }

  useEffect(() => {
    if (id) return;

    const fetchCooldownId = setTimeout(() => {
      if (value.length >= 3) {
        setFetchQuery(value);
      } else {
        setFetchQuery(null);
      }
    }, 500);

    return () => clearTimeout(fetchCooldownId);
  }, [value, id]);

  return (
    <div>
      <TextInput
        label={label}
        placeholder={placeholder}
        type="text"
        selectTheme={selectTheme}
        onChange={(e) => handleInput(e.currentTarget.value)}
        value={value}
        required={required}
        disabled={disabled}
        error={error}
      />
      {fetchQuery && (
        <ListFetcherAndSelector
          selectTheme={selectTheme}
          fetchKeys={[fetchKey, fetchQuery]}
          fetchfunction={fetchfunction(fetchQuery)}
          optionMapper={optionMapper}
          onError={setError}
          onSelection={(id, value) => {
            setId(id);
            setValue(value);
            setFetchQuery(null);
            onSelection(id, value);
          }}
        />
      )}
    </div>
  );
}
