import { useQuery, useMutation } from "react-query";
import http from "./http";

export const useAnnouncement = (params, config) =>
  useQuery(
    ["fetchAnnouncement", params],
    () => http.get(`/announcements`),
    config
  );

  // export const useFindAnnouncement = (searchText, config) =>
  // useQuery(
  //   ["findAnnouncement", searchText],
  //   () => http.get(`/announcements/filter?searchText=${searchText}`),
  //   config
  // );
