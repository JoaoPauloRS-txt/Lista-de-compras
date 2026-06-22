import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./category-select.module.scss";

import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useGetCategories } from "./api/get-categories";
import { Input } from "../../../Components/Input/input";

interface CategorySelectProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  errorMessage?: string;
}

export function CategorySelect({
  label,
  onChange,
  value,
  errorMessage,
}: CategorySelectProps) {
  const [search, setSearch] = useState("");
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
    setSearch("");
    onChange("");
  };
  const selectedCategory = categories?.find(
    (category) => category._id === value
  );

  return (
    <div ref={containerRef} className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <Input
        value={search || selectedCategory?.name || ""}
        placeholder="Escolha uma categoria"
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => setOpen((prev) => !prev)}
        iconPosition="right"
        cleanable={!!value}
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
                key={option._id}
                className={styles.option}
                onClick={() => {
                  onChange(option._id);
                  setOpen(false);
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
