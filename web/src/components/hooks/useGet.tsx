import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiResponse } from "../../types/interfaces/ApiResponse";
import { checkResponse } from "../../utils/checkResponse";
import { serverAPI } from "../../config";
import { getAuthCookie } from "@/utils/authCookie";
import { alertError } from "@/utils/alertsToast";

interface ReturnValues<T> {
  res: ApiResponse<T> | null;
  loading: boolean;
  setRes: React.Dispatch<React.SetStateAction<ApiResponse<T> | null>>;
  getData: () => Promise<void>;
  pushData: (data: T extends Array<infer U> ? U : T) => void;
  modifyData: (
    data: T extends Array<infer U> ? U : T,
    condition: (value: T extends Array<infer U> ? U : T) => boolean
  ) => void;
  filterData: (
    filter: (value: T extends Array<infer U> ? U : T) => boolean
  ) => void;
}

interface Options<T> {
  send?: boolean;
  alertError?: boolean;
  onResponse?: (response: ApiResponse<T> | null) => void;
}

export const useGet = <T,>(
  route: string,
  opt?: Options<T>,
  otherService?: boolean
): ReturnValues<T> => {
  const options = {
    send: opt?.send ?? true,
    alertError: opt?.alertError ?? true,
    onResponse: opt?.onResponse,
  };
  const navigate = useNavigate();
  const [res, setRes] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(options.send);

  const getData = async () => {
    setLoading(true);
    try {
      let endPoint = serverAPI + route;

      //if the user wants to use another service
      if (otherService) endPoint = route;

      const token = getAuthCookie();
      const response = await fetch(
        endPoint,
        token
          ? {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + token,
              },
              credentials: "include",
            }
          : undefined
      );

      const isValidResponse = checkResponse(response, navigate);
      if (isValidResponse) {
        type json = ApiResponse<T>;
        let json: json = await response.json();
        if (!response.ok && options.alertError) {
          alertError(json.message);
        }
        if (opt?.onResponse) {
          opt.onResponse(json);
        }
        //if the user used another service
        if (otherService) {
          json = {
            message: "Datos obtenidos con exito",
            status: 200,
            //@ts-ignore
            data: json.cabecera,
          };
        }
        setRes(json);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const pushData = (data: T extends Array<infer U> ? U : T) => {
    setRes((old) => {
      if (!old) return null;
      if (!Array.isArray(old.data)) return old;
      return {
        ...old,
        data: [...old.data, data] as T,
      };
    });
  };

  const filterData = (
    filter: (value: T extends Array<infer U> ? U : T) => boolean
  ) => {
    setRes((old) => {
      if (!old) return null;
      if (!Array.isArray(old.data)) return old;
      return {
        ...old,
        data: old.data.filter((value) => filter(value)) as T,
      };
    });
  };

  const modifyData = (
    data: T extends Array<infer U> ? U : T,
    condition: (value: T extends Array<infer U> ? U : T) => boolean
  ) => {
    setRes((old) => {
      if (!old) return null;
      if (!Array.isArray(old.data)) return old;
      return {
        ...old,
        data: old.data.map((value) => {
          if (condition(value)) {
            return data;
          }
          return value;
        }) as T,
      };
    });
  };

  useEffect(() => {
    if (options.send) {
      getData();
    }
  }, []);

  return {
    res,
    loading,
    setRes,
    getData,
    pushData,
    modifyData,
    filterData,
  };
};
