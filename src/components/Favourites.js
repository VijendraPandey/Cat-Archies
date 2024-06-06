import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";
import { clearFavs } from "../utils/likeSlice";
import { Button, Box } from "@mui/material";

const Favourites = () => {
  // Get favorite items from Redux store
  const favItems = useSelector((store) => store.like.likedCards);

  // Initialize dispatch function to dispatch actions
  const dispatch = useDispatch();

  // Function to handle clearing favorites
  const handleClearFavs = () => {
    dispatch(clearFavs());
  };

  return (
    <>
      {/* Button to clear favorites */}
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
      >
        <Button variant="contained" color="secondary" onClick={handleClearFavs}>
          Clear Favourites
        </Button>
      </Box>

      {/* Container for displaying favorite items */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {/* Map through favorite items and render each item */}
        {favItems.map((item) => (
          <Item id={item} />
        ))}
      </Box>
    </>
  );
};

export default Favourites;
