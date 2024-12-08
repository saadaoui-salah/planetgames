const API_URL = process.env.REACT_APP_API_URL

export const useGET = async (url: string, conf: { headers?: object; params?: object; }) => {
  const get: object = {
    method: "GET",
    credentials:'include',
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (conf?.headers) get.headers = { ...get.headers, ...conf.headers };

  const myUrl = new URL(`${API_URL}/${url}`);
  myUrl.search = new URLSearchParams({
    ...conf?.params,
  }).toString();
  const results = await fetch(myUrl, get)
    .then((response) => {
      if (!response.ok) {
        return {
          type: "error",
          message: "Network response was not ok",
        };
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return {
        type: "error",
        message: error,
      };
    });
  return results;
};

export const usePOST = async (url: string, conf: {
    headers?: object ; data: object;
  }) => {
  const post = {
    method: "POST",
    credentials:'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: new FormData(),
  };
  if (conf?.headers) post.headers = { ...post.headers, ...conf.headers };
  if (conf?.data?.image && typeof conf?.data?.image == "object") {
    delete post.headers["Content-Type"];
    const formData = new FormData();
    formData.append("file", conf.data.image);
    delete conf.data.image;
    formData.append("json_data", JSON.stringify(conf?.data));
    post.body = formData;
  } else {
    post.body = JSON.stringify(conf?.data);
  }

  const results = await fetch(`${API_URL}/${url}`, post)
    .then((response) => {
      if (!response.ok) {
        return {
          type: "error",
          message: "Network response was not ok",
        };
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return {
        type: "error",
        message: error,
      };
    });
  return results;
};
