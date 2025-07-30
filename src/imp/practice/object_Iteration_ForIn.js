function iterateObj() {
    let user = {
        book: "Sherlock Holmes",
        author: "Arthur Conan Doyle",
        genre: "Mystery"
    };

    for (let key in user) {
        if (user.hasOwnProperty(key)) {
            value = user[key];
            console.log(key, value);
        }
    }
}
iterateObj();