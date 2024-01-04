module.exports.today = function () {
    let date = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }
    // return "Daily"
    return date.toLocaleDateString("en-US", options); //"pl-PL"
}