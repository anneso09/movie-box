import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

type Movie = {
  slug: string;
  title: string;
  description_short: string;
  description_long: string;
  rating: string | null;
  type: string;
  img: string;
  isTrending: boolean;
  comingSoon: boolean;
};

type EditMovieModalProps = {
  movie: Movie;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditMovieModal({ movie, onClose, onSuccess }: EditMovieModalProps) {
  const [form, setForm] = useState({
    title: movie.title,
    description_short: movie.description_short,
    description_long: movie.description_long,
    img: movie.img,
    rating: movie.rating ?? "",
    type: movie.type,
    isTrending: movie.isTrending,
    comingSoon: movie.comingSoon,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm({ ...form, [target.name]: value });
  }

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

  async function handleSubmit() {
    await fetch(`/api/movies/${movie.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    onSuccess();
    onClose();
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Movie</DialogTitle>

      <DialogContent>
        <TextField fullWidth margin="normal" label="Title" name="title" value={form.title} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Type" name="type" value={form.type} onChange={handleChange} />
        <TextField fullWidth margin="normal" multiline rows={2} label="Short description" name="description_short" value={form.description_short} onChange={handleChange} />
        <TextField fullWidth margin="normal" multiline rows={4} label="Long description" name="description_long" value={form.description_long} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Image path" name="img" value={form.img} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Rating" name="rating" value={form.rating ?? ""} onChange={handleChange} />

        <FormControl>
          <FormLabel>Statut</FormLabel>
          <RadioGroup row value={statusValue} onChange={handleStatusChange}>
            <FormControlLabel value="none" control={<Radio />} label="Aucun" />
            <FormControlLabel value="trending" control={<Radio />} label="Trending" />
            <FormControlLabel value="comingSoon" control={<Radio />} label="Coming Soon" />
          </RadioGroup>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}