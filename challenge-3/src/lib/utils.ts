export const normalizedData = (data: string) => data.trim().toLowerCase();
export const pluralize = (count: number, noun: string, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;
