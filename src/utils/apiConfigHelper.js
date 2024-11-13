import axios from "axios";
// import { getToken } from 'Constants/base'

export const apiGetHelper = async (URL, params) => {
  try {
    const headers = {
      Accept: "application/json, multipart/form-data",
      withCredentials: false,
      //   Authorization: getToken(),
    };
    const responseData = await axios.get(URL, {
      params,
      headers,
    });
    return responseData;
  } catch (e) {
    //setSentryError(e)
    return e;
  }
};

export const apiDelHelper = async (URL) => {
  try {
    const headers = {
      Accept: "application/json",
      //   Authorization: getToken(),
    };
    const responseData = await axios.delete(URL, {
      headers,
    });
    return responseData;
  } catch (e) {
    return e;
  }
};

export const apiPostHelper = async (
  URL,
  PAYLOAD,
  requestHeaders = {},
  contentType = "application/json",
  excludeContent = false
) => {
  try {
    let contentTypeText = "application/json";
    if (contentType) {
      contentTypeText = contentType;
    }
    let headers;
    if (excludeContent) {
      headers = {
        // Authorization: getToken(),
      };
    } else {
      headers = {
        Accept: "application/json",
        "Content-Type": contentTypeText,
        // Authorization: getToken(),
      };
    }

    if (requestHeaders) {
      headers = {
        ...headers,
        ...requestHeaders,
      };
    }
    const responseData = await axios.post(URL, PAYLOAD, {
      headers,
    });
    return responseData;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const apiPostFormHelper = async (
  URL,
  PAYLOAD,
  requestHeaders = {},
  contentType = "application/json"
) => {
  try {
    let contentTypeText = "multipart/form-data";
    if (contentType) {
      contentTypeText = contentType;
    }
    let headers = {
      Accept: "application/json",
      "Content-Type": contentTypeText,
      //   Authorization: getToken(),
    };
    if (requestHeaders) {
      headers = {
        ...headers,
        ...requestHeaders,
      };
    }
    console.log("file2", PAYLOAD);
    const responseData = await axios.post(URL, PAYLOAD, { headers });
    return responseData;
  } catch (e) {
    //setSentryError(e)
    return e;
  }
};

export const apiPutHelper = async (
  URL,
  PAYLOAD,
  requestHeaders = {},
  contentType = "application/json"
) => {
  try {
    let contentTypeText = "application/json";
    if (contentType) {
      contentTypeText = contentType;
    }
    let headers = {
      Accept: "application/json",
      "Content-Type": contentTypeText,
      //   Authorization: getToken(),
    };
    if (requestHeaders) {
      headers = {
        ...headers,
        ...requestHeaders,
      };
    }
    const responseData = await axios.put(URL, PAYLOAD, {
      headers,
    });

    return responseData;
  } catch (e) {
    console.error(e);
    return e;
  }
};
export const apiPatchHelper = async (URL) => {
  try {
    const headers = {
      Accept: "application/json",
      //   Authorization: getToken(),
    };
    const responseData = await axios.patch(
      URL,
      {},
      {
        headers,
      }
    );
    return responseData;
  } catch (e) {
    return e;
  }
};
