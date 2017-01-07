//This is the random number generator, return to the url_shortener the randomNum.
function randomizer () {
    //Math function to generate random number between 1000000 and 9999999.
    var randomNum = Math.round(Math.random() * (9999999 - 1000000) + 1000000); //randomizer
    return randomNum;
}

//This is the functionality for the URL shortener. It Exports the shortened URL.
exports.url_shortener = (oldUrl, customUrl) => {

    //Store the parts of the shortened URL.
    const preUrl = "an.dy"; //Prefix for the shortened Url
    //suffixUrl is the value after an.dy, it will be a custom value if inputed by the user,
    //otherwise it will be a random number from the randomizer function.
    var suffixUrl = customUrl || randomizer();
    var newURL = preUrl+"/"+suffixUrl; //New Url including suffixUrl.

    //New URL response, It includes the old Url
    return {original_url: oldUrl, shortened_url: newURL};
    //console.log(req.params.url);
}
