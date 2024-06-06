import React from "react";
import { Grid, Card, CardMedia, CardActionArea } from "@mui/material";

const Item = ({ id }) => {
  // URL for the cat image
  const url = `https://cdn2.thecatapi.com/images/${id}.jpg`;

  return (
    <Grid item xs={12} sm={4} ms={4}>
      {/* Card component for displaying the cat image */}
      <Card
        sx={{
          maxWidth: 345,
          height: 200,
          padding: "10px",
          marginBottom: "30px",
          position: "relative",
        }}
      >
        {/* Card content */}
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={url}
            alt="image"
            sx={{ borderRadius: "5px", objectFit: "cover" }}
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Item;
