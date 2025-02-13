import { createClient } from 'contentful';

console.log("Space ID:", process.env.REACT_APP_API_SPACE);
console.log("Access Token:", process.env.REACT_APP_API_ACCESS_TOKEN);

export default createClient({
    space: process.env.REACT_APP_API_SPACE,
    accessToken: process.env.REACT_APP_API_ACCESS_TOKEN
});
