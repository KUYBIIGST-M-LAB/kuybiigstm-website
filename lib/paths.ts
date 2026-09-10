export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (typeof window !== 'undefined' && window.location.pathname.startsWith('/kuybiigstm-website')
    ? '/kuybiigstm-website'
    : '');

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

  const currentBase =
    basePath ||
    (typeof window !== 'undefined' && window.location.pathname.startsWith('/kuybiigstm-website')
      ? '/kuybiigstm-website'
      : '');

  if (!currentBase) return path;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (normalizedPath.startsWith(currentBase)) {
    return normalizedPath;
  }
  return `${currentBase}${normalizedPath}`;
}
