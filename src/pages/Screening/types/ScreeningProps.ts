export type ScreeningProps = {
  lastScreeningDate: number;
  screened: boolean;
};

export type ScreeningResponseProps = {
  data: ScreeningProps;
  success: boolean;
};
