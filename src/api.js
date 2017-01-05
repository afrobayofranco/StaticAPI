//This is the functionality for the URL shortener. It Exports the shortened URL.
exports.url_shortener = (oldUrl) => {

    //Store the parts of the shortened URL.
    const preUrl = "an.dy"; //Prefix for the shortened Url
    var randomNum = Math.round(Math.random() * (9999 - 1000) + 1000); //randomizer
    var newURL = preUrl+"/"+randomNum; //New Url including random number.

    //New URL response, It includes the old Url
    return {original_url: oldUrl, shortened_url: newURL};
    //console.log(req.params.url);
}
