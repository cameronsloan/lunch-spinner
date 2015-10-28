function makeID(idlength) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for( var i = 0; i < idlength; i++ )
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}