export interface GoogleModel {
  places: places[];
}

export interface GoogleSelector {
  google: GoogleModel;
}

export interface places {
  displayName: {
    text:string,
    languageCode:string
  }
  formattedAddress: string;
  priceLevel: string;
  googleMapsUri: string;
  location: {
    latitude: number,
    longitude: number,
  }
}
