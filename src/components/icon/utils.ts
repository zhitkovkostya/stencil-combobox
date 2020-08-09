const requests = new Map<string, Promise<string>>();

export function getSvgContent(url: string) {
  let req = requests.get(url);

  // see if we already have a request for this url
  if (!req) {
    // we don't already have a request
    req = fetch(url).then(rsp => {
      if (rsp.status <= 299) {
        return rsp.text();
      }
      return Promise.resolve(null);

    }).then(svgContent => {
      return svgContent;
    });

    // cache for the same requests
    requests.set(url, req);
  }

  return req;
}
