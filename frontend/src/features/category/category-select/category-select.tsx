import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./category-select.module.scss";

import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useGetCategories } from "./api/get-categories";
import { Input } from "../../../Components/Input/input";

interface DropdownProps {
  label?: string;
  value?: string | number;
  onChange: (value: string | number) => void;
  errorMessage?: string;
}

export function CategorySelect({
  label,
  onChange,
  errorMessage,
}: DropdownProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const { data: categories } = useGetCategories();

  const filteredOptions = useMemo(() => {
    return categories?.filter((option) =>
      option.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    setSelected("");
    setSearch("");
    onChange("");
  };
  return (
    <div ref={containerRef} className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <Input
        value={search || selected}
        placeholder="Escolha uma categoria"
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => setOpen((prev) => !prev)}
        iconPosition="right"
        cleanable={!!selected}
        onClear={handleClear}
        icon={open ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
      />
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
      {open && (
        <div className={styles.dropdown}>
          <ul className={styles.list}>
            {filteredOptions?.map((option) => (
              <li
                key={option.id}
                className={styles.option}
                onClick={() => {
                  onChange(option.name);
                  setOpen(false);
                  setSelected(option.name);
                  setSearch("");
                }}
              >
                {option.name}
              </li>
            ))}

            {filteredOptions?.length === 0 && (
              <li className={styles.empty}>Nenhum resultado encontrado</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
