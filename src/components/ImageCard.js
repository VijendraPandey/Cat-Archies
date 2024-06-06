import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../utils/likeSlice";

const ImageCard = ({ info }) => {
  // Destructure information about the cat
  const { name, description, reference_image_id, origin, life_span } = info;

  // URL for the cat image
  const url = `https://cdn2.thecatapi.com/images/${reference_image_id}.jpg`;

  // Check if the image is liked
  const likedCards = useSelector((state) => state.like.likedCards);
  const isLiked = likedCards.includes(reference_image_id);

  // Initialize dispatch function to dispatch actions
  const dispatch = useDispatch();

  // Function to handle like action
  const handleLike = () => {
    dispatch(toggleLike(reference_image_id));
  };

  return (
    <Grid item xs={12} sm={4} ms={4}>
      {/* Card component for displaying cat information */}
      <Card
        sx={{
          maxWidth: 345,
          height: 400,
          padding: "10px",
          marginBottom: "30px",
          position: "relative",
        }}
      >
        {/* Like button */}
        <IconButton
          sx={{
            position: "absolute",
            left: "8px",
            bottom: "8px",
            color: isLiked ? "red" : "inherit",
            zIndex: 1,
          }}
          onClick={() => handleLike(info)}
        >
          <FavoriteIcon />
        </IconButton>

        {/* Card content */}
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={url}
            alt={name}
            sx={{ borderRadius: "5px", objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography>{origin}</Typography>
            <Typography>{life_span}</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.2,
                maxHeight: 40,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ImageCard;
