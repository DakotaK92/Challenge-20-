// use this to decode and get user's information out of it
import decode from 'jwt-decode';

// create a new class to instantaite for a user
class AuthService {
    // get user data
    getProfile () {
        return decode(this.getToken());
    }

    // check if user's logged in
    loggedIn () {
        // Checks if there is a saved and it's till valid
        const token = this.getToken();
        return !! token && !this.isTokenExpired(token); // handwaiving here
    }

    // check if token is expired
    isTokenExpired (token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < DataTransfer.now / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken () {
        // Retrieves the user to localStorage
        return localStorage.getItem('id_token');
    }
    
    login(idToken) {
        // Saves user token from localStorage
        return localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        // clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();