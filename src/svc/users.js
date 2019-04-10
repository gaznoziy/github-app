import { GITHUB_CREDENTIALS } from '../config/config';

const GITHUB_URL = 'https://api.github.com/search/users?q=type:user';

export const fetchUsersRequest = async (page, filters) => {
  const response = await fetch(`${GITHUB_URL}${filters}&access_token=${GITHUB_CREDENTIALS.OAUTH_TOKEN}&page=${page}`);
  return await response.json();
}
