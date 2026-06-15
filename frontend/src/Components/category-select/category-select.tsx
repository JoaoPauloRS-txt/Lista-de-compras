import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./category-select.module.scss";
import { Input } from "../Input/input";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

interface Category {
  id: number;
  name: string;
}

interface DropdownProps {
  label?: string;
  options: Category[];
  value?: string | number;
  onChange: (value: string | number) => void;
}

export function CategorySelect({ label, options, onChange }: DropdownProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

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

      <div className={styles.dropdown}>
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
        {open && (
          <ul className={styles.list}>
            {filteredOptions.map((option) => (
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

            {filteredOptions.length === 0 && (
              <li className={styles.empty}>Nenhum resultado encontrado</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
