exports.url_shortener = (oldUrl) => {

    var preUrl = "an.dy";
    var randomNum = Math.round(Math.random() * (9999 - 1000) + 1000); //randomizer
    var newURL = preUrl+"/"+randomNum;

    //New URL response
    return {original_url: oldUrl, shortened_url: newURL};
    //console.log(req.params.url);
}
