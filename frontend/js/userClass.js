class userClass {

    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.connectionList = [];
        this.socialLinks = [];
    }

    //adds a single user to this connection list
    addConnect(u) {
        this.connectionList.push(u);
        u.connectionList.push(this);
    }

    //returns an array of connection list
    getConnects() {
        var result = [];
        for (var i = 0; i < this.connectionList.length; i++) {
            result.push(this.connectionList[i]);
        }
        return result;
    }

    //param u: takes in ID of a users
    //checks to see if this user is connected to u
    isConnected(u) {
        for (var i = 0; i < this.connectionList.length; i++) {
            if (this.connectionList[i] === u) return true;
        }
        return false;
    }

    //input u: userClass
    //output: Array of shared friends between this and u users
    getFirstConnectList(u) {
        var firstConnectionList = [];
        for (var i = 0; i < this.connectionList.length; i++) {
            for (var j = 0; j < u.connectionList.length; j++) {
                if (this.connectionList[i].id === u.connectionList[j].id) {
                    firstConnectionList.push(this.connectionList[i]);
                }
            }
        }
        return firstConnectionList;
    }

    //input u: userClass u
    //output: list of users who are friends with u but not this
    getSecondConnectList(u) {
        var secondConnectionList = [];
        for (var i = 0; i < this.connectionList.length; i++) {
            if (!this.isConnected(u.connectionList[i]) && this.id !== u.connectionList[i].id) {
                secondConnectionList.push(u.connectionList[i]);
            }
        }
        return secondConnectionList;
    }

    addSocialLink(url) {
        this.socialLinks.push(url);
    }

    getSocialLinks() {
        var l;
        for (var i = 0; i < this.socialLinks.length; i++) {
            l = this.socialLinks[i];
            console.log(l);

            if (l.includes("facebook"))
                $(".socialLinks").append('<a href="' + l + '"><i class="fab fa-facebook" style="background-color:#3b5998;"></i></a>');
            else if (l.includes("twitter"))
                $(".socialLinks").append('<a href="' + l + '"><i class="fab fa-twitter" style="background-color:#1dcaff"></i></a>');
            else if (l.includes("instagram"))
                $(".socialLinks").append('<a href="' + l + '"><i class="fab fa-instagram" style="background-color:#833AB4"></i></a>');
            else if (l.includes("linkedin"))
                $(".socialLinks").append('<a href="' + l + '"><i class="fab fa-linkedin" style="background-color:#0e76a8"></i></a>');
            else if (l.includes("spotify"))
                $(".socialLinks").append('<a href="' + l + '"><i class="fab fa-spotify" style="background-color:#84bd00"></i></a>');
            else if (l.includes('reddit'))
                $(".socialLinks").append('<a href="#"><i class="fab fa-reddit" style="background-color:#FF4301"></i></a>');
            else if (l.includes('snapchat'))
                $(".socialLinks").append('<a href="' + l + '"><i class="fab fa-snapchat" style="background-color:#FFFC00"></i></a>');
            else if (l.includes('yelp'))
                $(".socialLinks").append('<a href="' + l + '"><i class="fab fa-yelp" style="background-color:#c41200"></i></a>');
        }
    }

    getName() {
        return this.name;
    }

    setName(n) {
        this.name = n;
    }
    getID() {
        return this.id;
    }


}