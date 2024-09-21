import { deleteCookie } from 'h3';

export default defineEventHandler((event) => {
  deleteCookie(event, 'accessToken');
  deleteCookie(event, 'refreshToken');
  return { success: true };
});
