function logOut(event) {
    localStorage.removeItem('dumbphoneapps-csrf-token');
    window.location.replace("/signup.html");
}