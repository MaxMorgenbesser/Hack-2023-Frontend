import { API_URL } from "@env";
import axios from "axios";

export const submitNumber = async (number: string, countryCode: string) => {
  console.log(API_URL)
  return axios.post(API_URL + "/user/login", {
    number: number,
    countryCode: countryCode,
  });
};

export const submitPin = async (pin: string, _id: string, token: string) => {
  return axios.post(
    API_URL + "/user/verify/" + _id,
    {
      pin: pin,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};
