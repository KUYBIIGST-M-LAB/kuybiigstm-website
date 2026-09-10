export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(path?: string | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('//') ||
    path.startsWith('data:')
  ) {
    return path;
  }
  if (!basePath) return path;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (normalizedPath.startsWith(basePath)) {
    return normalizedPath;
  }
  return `${basePath}${normalizedPath}`;
}
