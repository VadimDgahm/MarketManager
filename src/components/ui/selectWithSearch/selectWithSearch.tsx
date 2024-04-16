import Select from "react-select";
import { Typography } from "@/components/ui/typography";
import s from "@/components/ui/select/select.module.scss";

type Option = {
  value: string;
  label: string;
};

type SelectWithSearchProps = {
  title: string;
  options: Option[];
  onChange: (value: any) => void;
};
export const SelectWithSearch = ({
  title,
  options,
  onChange,
}: SelectWithSearchProps) => {
  return (
    <div className={s.content}>
      {title && (
        <Typography className={s.title} variant={"body2"}>
          {title}
        </Typography>
      )}
      <Select<Option>
        autoFocus={false}
        placeholder={""}
        onChange={(newValue) => onChange(newValue)}
        styles={{
          control: (baseStyles) => {
            return {
              ...baseStyles,
              color: "white",
              backgroundColor: "none",
            };
          },

          option: (baseStyles, state) => {
            return {
              ...baseStyles,
              color: "white",
              transition: "0.3s",
              background: state.isFocused ? "#a78ded" : "none",
              borderBottom: "0.5px solid gray",
              cursor: "pointer",
            };
          },
          input: (baseStyles) => {
            return {
              ...baseStyles,
              color: "white",
            };
          },
          menu: (baseStyles) => {
            return {
              ...baseStyles,
              background: "#2a2a2d",
              borderRadius: "0 0 4px 4px",

              borderTop: "none",
              top: "85%",
            };
          },
          singleValue: (baseStyles) => {
            return {
              ...baseStyles,
              color: "#ffffff",
            };
          },
        }}
        options={options}
      />
    </div>
  );
};
