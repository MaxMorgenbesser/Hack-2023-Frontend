import { GOOGLE_API_KEY } from "@env";
import axios from "axios";

export const fetchGoogleData = async () => {
   
      return await axios.post(
        'https://places.googleapis.com/v1/places:searchText',
        {
          textQuery: 'Cancer Screening near me'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_API_KEY,
            'X-Goog-FieldMask': 'places.displayName,places.location,places.formattedAddress,places.priceLevel,places.googleMapsUri'
          }
        }
      );
  
  };
