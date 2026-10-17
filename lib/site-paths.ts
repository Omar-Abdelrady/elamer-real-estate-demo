const basePath = process.env.GITHUB_ACTIONS === "true" ? "/elamer-real-estate-demo" : "";

export function siteAsset(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
