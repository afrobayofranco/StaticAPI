// This is the random number generator, returns the randomNum to the url_shortener.
function randomizer() {
  // Math function to generate random number between 1000000 and 9999999.
  return Math.round(Math.random() * ((9999999 - 1000000) + 1000000));
}
// This is the functionality for the URL shortener. It Exports the shortened URL.
function urlShortener(oldUrl, customUrl) {
  // Store the parts of the shortened URL.
  const preUrl = 'an.dy'; // Prefix for the shortened Url
  // suffixUrl is the value after an.dy, it will be a custom value if inputed by the user,
  // otherwise it will be a random number from the randomizer function.
  const suffixUrl = customUrl || randomizer();
  const newURL = preUrl + '/' + suffixUrl; // New Url including suffixUrl.

  // New URL response, it includes the old Url
  return {
    original_url: oldUrl,
    shortened_url: newURL,
  };
}
// This exports the shortened_url: an.dy/XXXXXXX
exports.url_shortener = urlShortener;
