import { FormEvent, useEffect, useRef, useState } from "react";
import { cityApi, type CityCandidate } from "@/entities/city";
import { Button, Input } from "@/shared/ui";
import { useDebounce } from "@/shared/lib/useDebounce";

interface AddCityFormProps {
  onAdd: (name: string) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
  onResetError: () => void;
}

const formatCandidateLabel = (candidate: CityCandidate) => {
  const parts = [candidate.name, candidate.region, candidate.country].filter(Boolean);
  return parts.join(", ");
};

export const AddCityForm = ({ onAdd, isLoading, error, onResetError }: AddCityFormProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CityCandidate | null>(null);
  const [candidates, setCandidates] = useState<CityCandidate[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (trimmed.length < 2) {
      setCandidates([]);
      return;
    }

    setIsSearching(true);
    cityApi
      .search(trimmed)
      .then(setCandidates)
      .catch(() => setCandidates([]))
      .finally(() => setIsSearching(false));
  }, [debouncedQuery]);

  const handleChange = (value: string) => {
    setQuery(value);
    setSelected(null);
    setIsOpen(true);
    onResetError();
  };

  const handleSelect = (candidate: CityCandidate) => {
    setQuery(candidate.name);
    setSelected(candidate);
    setCandidates([]);
    setIsOpen(false);
    onResetError();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const name = selected?.name || query.trim();
    if (!name) return;

    try {
      await onAdd(name);
      setQuery("");
      setSelected(null);
      setCandidates([]);
    } catch {}
  };

  const showDropdown = isOpen && (candidates.length > 0 || isSearching);

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Добавить город</h2>
      <div ref={wrapperRef} className="relative">
        <Input
          placeholder="Название города"
          value={query}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={() => setIsOpen(true)}
          autoComplete="off"
          required
        />
        {showDropdown && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-200 bg-white shadow-lg">
            {isSearching && candidates.length === 0 && (
              <li className="px-4 py-2 text-sm text-slate-500">Поиск...</li>
            )}
            {candidates.map((candidate) => (
              <li key={`${candidate.name}-${candidate.latitude}-${candidate.longitude}`}>
                <button
                  type="button"
                  onClick={() => handleSelect(candidate)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                >
                  {formatCandidateLabel(candidate)}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && (
        <p className="rounded bg-red-100 px-3 py-2 text-sm text-red-700">
          {error.message || "Не удалось добавить город"}
        </p>
      )}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Добавление..." : "Добавить в избранное"}
      </Button>
    </form>
  );
};
