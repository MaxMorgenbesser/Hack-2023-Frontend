export interface GoogleModel {
  places: places[];
}

export interface GoogleSelector {
  google: GoogleModel;
}

export interface places {
  displayName: string;
  formattedAddress: string;
  priceLevel: string;
  googleMapsUri: string;
}
