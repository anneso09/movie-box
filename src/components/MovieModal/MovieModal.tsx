import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";

type MovieModalProps = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function MovieModal({ onClose, onSuccess }: MovieModalProps) {
  const [form, setForm] = useState({
    title: "",
    description_short: "",
    description_long: "",
    img: "",
    rating: "",
    type: "",
    isTrending: false,
    comingSoon: false,
  });

  // Détermine quelle option radio est actuellement sélectionnée
  const statusValue = form.isTrending
    ? "trending"
    : form.comingSoon
      ? "comingSoon"
      : "none";

  // Met à jour les 2 booléens selon l'option choisie (mutuellement exclusif)
  function handleStatusChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setForm({
      ...form,
      isTrending: value === "trending",
      comingSoon: value === "comingSoon",
    });
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm({ ...form, [target.name]: value });
  }

  async function handleSubmit() {
    await fetch("/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    onSuccess();
    onClose();
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Add a Movie</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Type (ex: Sci-Fi)"
          name="type"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          multiline
          rows={2}
          label="Short description"
          name="description_short"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          multiline
          rows={4}
          label="Long description"
          name="description_long"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Image path (ex: /images/monfilm.jpg)"
          name="img"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Rating (ex: 8.5)"
          name="rating"
          onChange={handleChange}
        />

        <FormControl>
          <FormLabel>Statut</FormLabel>
          <RadioGroup row value={statusValue} onChange={handleStatusChange}>
            <FormControlLabel value="none" control={<Radio />} label="Aucun" />
            <FormControlLabel
              value="trending"
              control={<Radio />}
              label="Trending"
            />
            <FormControlLabel
              value="comingSoon"
              control={<Radio />}
              label="Coming Soon"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            bottom: 8,
            right: 8,
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            bottom: 8,
            right: 8,
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
