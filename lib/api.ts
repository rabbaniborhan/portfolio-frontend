export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface RequestConfig {
  params?: Record<string, any>;
  revalidate?: number | false; // Next.js revalidation time in seconds (default: 60)
  tags?: string[];             // Next.js cache revalidation tags
  cache?: RequestCache;        // Next.js fetch cache mode ('force-cache', 'no-store', etc.)
}

async function httpRequest<T = any>(
  method: string,
  endpoint: string,
  body?: any,
  configOptions?: RequestConfig
): Promise<{ data: T; status: number; ok: boolean }> {
  let url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  if (configOptions?.params) {
    const searchParams = new URLSearchParams();
    Object.entries(configOptions.params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        searchParams.append(key, String(val));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const isFormData = typeof window !== "undefined" && body instanceof FormData;
  const headers: Record<string, string> = isFormData
    ? {}
    : { "Content-Type": "application/json" };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const isGet = method.toUpperCase() === "GET";

  const fetchConfig: RequestInit = {
    method,
    headers,
    credentials: "include",
    // Next.js Data Caching configuration
    cache: configOptions?.cache || (isGet ? undefined : "no-store"),
    ...(isGet && {
      next: {
        revalidate: configOptions?.revalidate ?? 60, // Next.js revalidates data every 60s
        tags: configOptions?.tags,
      },
    }),
  };

  if (body !== undefined && body !== null) {
    fetchConfig.body = isFormData ? body : JSON.stringify(body);
  }

  const res = await fetch(url, fetchConfig);
  let data: any = null;
  try {
    data = await res.json();
  } catch {
    // empty response
  }

  if (!res.ok) {
    const errorMessage = data?.message || `HTTP Error ${res.status}: ${res.statusText}`;
    throw { response: { data, status: res.status }, message: errorMessage };
  }

  return { data, status: res.status, ok: res.ok };
}

export const api = {
  get: <T = any>(endpoint: string, config?: RequestConfig) =>
    httpRequest<T>("GET", endpoint, undefined, config),
  post: <T = any>(endpoint: string, body?: any, config?: RequestConfig) =>
    httpRequest<T>("POST", endpoint, body, config),
  put: <T = any>(endpoint: string, body?: any, config?: RequestConfig) =>
    httpRequest<T>("PUT", endpoint, body, config),
  patch: <T = any>(endpoint: string, body?: any, config?: RequestConfig) =>
    httpRequest<T>("PATCH", endpoint, body, config),
  delete: <T = any>(endpoint: string, config?: RequestConfig) =>
    httpRequest<T>("DELETE", endpoint, undefined, config),
};

export default api;
