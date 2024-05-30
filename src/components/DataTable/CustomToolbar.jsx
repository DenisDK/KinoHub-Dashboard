import { GridToolbarContainer } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import { useTheme } from "next-themes";

const CustomToolbar = ({ searchQuery, setSearchQuery }) => {
  const { theme } = useTheme();

  return (
    <GridToolbarContainer
      sx={{
        borderBottom: "1px solid",
        borderColor: theme === "dark" ? "#ccc" : "#272727",
      }}
    >
      <TextField
        label="Пошук за ніком"
        variant="outlined"
        fullWidth
        margin="dense"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          backgroundColor: "transparent",
          color: theme === "dark" ? "#ccc" : "#272727",
          "& .MuiInputBase-root": {
            color: theme === "dark" ? "#ccc" : "#272727",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent", // Remove the border
            },
            "&:hover fieldset": {
              borderColor: "transparent", // Remove the hover border
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent", // Remove the focused border
            },
          },
          "& .MuiInputLabel-root": {
            color: theme === "dark" ? "#ccc" : "#272727",
          },
        }}
      />
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
