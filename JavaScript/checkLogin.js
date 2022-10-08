import { index_html } from "./locationUrls.js";

var loggedUser = sessionStorage.getItem('User');
if (loggedUser == null)
{
    location.replace(`${index_html}`);
}