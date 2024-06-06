import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Grid,
  TextField,
  Skeleton,
  Badge,
} from "@mui/material";
import ImageCard from "./components/ImageCard";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { url } from "./constants";

function App() {
  // State variables
  const [images, setImages] = useState([]); // Holds fetched cat images
  const [loading, setLoading] = useState(true); // Indicates if images are being loaded
  const [searchTerm, setSearchTerm] = useState(""); // Holds the search term entered by the user

  // Redux selector to get favorited items
  const favItems = useSelector((store) => store.like.likedCards);

  // Effect hook to fetch images on component mount
  useEffect(() => {
    getPics();
    // eslint-disable-next-line
  }, []);

  // Function to fetch cat images from the API
  async function getPics() {
    const data = await fetch(url);

    const json = await data.json();
    const validImages = await filterValidImages(json);
    setImages(validImages);
    setLoading(false);
  }

  // Function to filter valid images
  async function filterValidImages(images) {
    const validImages = [];

    for (const img of images) {
      const imageUrl = `https://cdn2.thecatapi.com/images/${img.reference_image_id}.jpg`;
      if (await imageExists(imageUrl)) {
        validImages.push(img);
      }
    }

    return validImages;
  }

  // Function to check if an image exists
  function imageExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  // Function to handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter images based on search term
  const filteredImages = images.filter((img) =>
    img.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      {/* Heading */}
      <Typography
        variant="h4"
        align="center"
        sx={{ marginTop: "20px", marginBottom: "40px" }}
      >
        CAT ARCHIES
      </Typography>

      {/* Search bar and favorites button */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <TextField
          label="Search by Breed"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
          variant="outlined"
          sx={{ marginRight: 1 }}
        />
        <IconButton component={Link} to="/fav" sx={{ textDecoration: "none" }}>
          <Badge badgeContent={favItems.length} color="secondary">
            <BookmarkIcon />
          </Badge>
        </IconButton>
      </Box>

      {/* Grid for displaying images */}
      <Grid container spacing={5} sx={{ marginTop: "20px" }}>
        {/* If images are loading, show skeleton loaders */}
        {loading ? (
          Array.from(new Array(21)).map((_, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Skeleton variant="rectangular" width={345} height={140} />
              <Skeleton width="60%" />
              <Skeleton width="80%" />
            </Grid>
          ))
        ) : filteredImages.length === 0 ? (
          <Typography variant="h6" align="center">
            {/* If no images found, show message */}
            No results found.
          </Typography>
        ) : (
          /* If images found, map through and display */
          filteredImages.map((img, index) => (
            <ImageCard key={index} info={img} />
          ))
        )}
      </Grid>
    </Container>
  );
}

export default App;
