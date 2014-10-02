/**
 * Created by arafat on 9/24/2014.
 */
/**
 * Check reference here:
 * https://developers.facebook.com/quickstarts/766349053425031/?platform=web
 */

window.fbAsyncInit = function() {
    FB.init({
        appId      : '766349053425031',
        xfbml      : true,
        version    : 'v2.1'
    });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));