var formSearch = document.getElementById("searchBox"); //sets searchBox as var
            var searchQuery = document.getElementById("searchQuery"); //sets search query as var
            
            var Username = "User"; //change Username here
            var footer = false; //put boolean
            var NetworkDevices = true; //boolean to show network devices section
            var hr12 = false; //if 12 is enabled, boolean

            var noND = 1;
            var ND0 = new Object(); //copy these lines for each object, name needs to be numbered accordingly
                ND0.url = "https://google.com";
                ND0.pingUrl = "https://coderjony.com/media/1036/update-git-branches-in-visual-studio.png";
                ND0.name = "Name";
            
            //Array for weekdays, rename them here
            var weekday = new Array(7);
                weekday[0] = "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "FriYAY";
                weekday[6] = "Sunday";
                
            //Array for greeting texts, rename them here
            var greeting = new Array(10);
                greeting[0] = "Hey";
                greeting[1] = "Its showtime";
                greeting[2] = "Howdy";
                greeting[3] = "Welcome to the club";
                greeting[4] = "Hi";
                greeting[5] = "Hiya! Have a nice day";
                greeting[6] = "Hello";
                greeting[7] = "Whats up";
                greeting[8] = "Long-time no see";
                greeting[9] = "Moin";

            var greetingRNG = Math.floor(greeting.length*Math.random()); //set variable for the randomness
            
            //Search Provider Array
            var searchProvider = new Array(3);
                searchProvider[0] = "https://www.duckduckgo.com/"; //change these entrys for your costum search
                searchProvider[1] = "https://google.com/search?q=";
                searchProvider[2] = "https://qwant.com/?q=";

            //Function for searchbar / searchquery
            function submitSearchQuery(event) {
                event.preventDefault();
                //saves the url & provider as string in var
                var searchurl = searchProvider[window.localStorage.getItem("SearchProvider")] + searchQuery.value;
                //opens window with var, "_blank" = new tab
                var win = window.open(searchurl, "_blank");
                //focus the new window
                win.focus();
            }

            //Loading routine, loads on every restart
            window.onload = () => {
                //load functions
                document.getElementById("Time").innerHTML = getTime();
                document.getElementById("Date").innerHTML = getDate();
                getSettings();
                getNetworkDevice();

                //Interval for clock
                setInterval( () => {
                    document.getElementById("Time").innerHTML =getTime();
                },100)
                //Interval for the ping function
                setInterval( () => {
                    pingChangeHtml();
                }, 2000) //set this time [ms] to the desired ping time
            }

            //Function to save the settings in the local storage
            function setSettings(){
                //set items with inputs from the form 
                window.localStorage.setItem("12hr", document.getElementById("switch12hr").checked);
                window.localStorage.setItem("Darkmode", document.getElementById("switchDarkmode").checked);
                window.localStorage.setItem("Search", document.getElementById("switchSearch").checked);
                window.localStorage.setItem("SearchProvider", document.getElementById("selectSearchProvider").value);
                window.localStorage.setItem("showTitle", document.getElementById("switchTitle").checked);
                window.localStorage.setItem("showSubtitle", document.getElementById("switchSubtitle").checked);
                window.localStorage.setItem("subtitle", document.getElementById("inputSubtitle").value);
            }
            
            //Function to load all the saved settings from browsers localStorage
            function getSettings(){
                //Search Provider
                document.getElementById("selectSearchProvider").value = window.localStorage.getItem("SearchProvider");
                
                // get title settings
                // toggle title visibility
                if (window.localStorage.getItem("showTitle") == "true") {
                    document.getElementById("switchTitle").checked = true;
                    document.getElementById("greeting").style.display = "";
                } else {
                    document.getElementById("switchTitle").checked = false;
                    document.getElementById("greeting").style.display = "none";
                }
                
                // set subtitle field in settings
                document.getElementById("inputSubtitle").value = window.localStorage.getItem("subtitle");
                // set html elements to the subtitle
                document.getElementById("subtitle").innerHTML = window.localStorage.getItem("subtitle");
                
                
                // toggle subtitle visibility
                if (window.localStorage.getItem("showSubtitle") == "true") {
                    document.getElementById("switchSubtitle").checked = true;
                    document.getElementById("subtitle").style.display = "";
                } else {
                    document.getElementById("switchSubtitle").checked = false;
                    document.getElementById("subtitle").style.display = "none";
                }
                
                //Import username and set placeholder in field
                document.getElementById("greeting").innerHTML = greeting[greetingRNG];
                document.getElementById("greeting").innerHTML = greeting[greetingRNG]+ ", "+ Username + "!";
                
                //toggle network devices visibility
                if (NetworkDevices == true) {
                    document.getElementById("containerNetworkDevices").style.display = "";
                } else {
                    document.getElementById("containerNetworkDevices").style.display = "none";
                }
                
                // toggle darkmode and set the toggle in settings
                var Darkmode = window.localStorage.getItem("Darkmode");
                if (Darkmode == "true") {
                    document.getElementById("switchDarkmode").checked = true;
                    document.body.setAttribute("data-theme", "dark"); //set css theme
                } else {
                    document.getElementById("switchDarkmode").checked = false;
                }

                //Get 12 Hr
                document.getElementById("switch12hr").checked = hr12;


                //sets footer toggle and visibility
                if (footer == true){
                    document.getElementById("Footer").style.display = "";
                    
                } else {
                    document.getElementById("Footer").style.display = "none";
                }

                //sets search box visibility and toggle
                var switchSearch="";
                switchSearch = window.localStorage.getItem("Search");
                if (switchSearch == "true") {
                    document.getElementById("switchSearch").checked = true;
                    formSearch.style.display = ""
                } else {
                    document.getElementById("switchSearch").checked = false;
                    formSearch.style.display = "none"
                }
                
            }
            

            function getNetworkDevice(){
                var str;
                var networkDevice;
                for(z = 0; z < noND; z++) {
                    var networkDevice = ["ND" + z];
                    document.getElementById("BadgePing"+z).style.display = "";
                    document.getElementById("device" + z).innerHTML = networkDevice.Name;
                    document.getElementById("url" + z).href = networkDevice.url;
                    document.getElementById("url" + z).innerHTML = networkDevice.url;
                    document.getElementById("device" + z).style.display = "";
                    document.getElementById("url" + z).style.display = "";
                    document.getElementById("url" + z).style.display = "";
                }
            }  

            //PingChangeHTML
            function pingChangeHtml() {    
                for(z = 0; z < noND; z++) {
                    if (pingImageURL(["ND" + z].pingUrl) == true) {
                        document.getElementById("BadgePing" + z).innerHTML = "&#10004 Ping Successful!";
                        document.getElementById("BadgePing" + z).className = "badge bg-success";
                    } else {
                        document.getElementById("BadgePing" + z).innerHTML = "&#8252 Ping Failed";
                        document.getElementById("BadgePing" + z).className = "badge bg-danger";
                    }
                }
            }

            function pingImageURL(ip) {
                var image = new Image();
                image.src = ip;
                var flag = false;
                setTimeout(
                    function() {
                        if ( !image.complete || !image.naturalWidth ) {
                            flag = false;
                        }else {
                            flag = true;
                        }
                    },
                1000
                )
                return flag;
            }   


            //function to get time
            function getTime() {
                let date = new Date(),
                    sec = date.getSeconds(),
                    min = date.getMinutes(),
                    hour = date.getHours();

                var ampm = hour >= 12 ? "pm" : "am"; //var for pm/am snippet bihind numbers

                //Return and Fromat Output
                if (hr12 == "true"){
                    hour = hour % 12;
                    hour = hour ? hour : 12; //0 to 12 conversion
                    return""+
                        hour + ":" + (min < 10 ?("0" + min): min) + ":" + (sec < 10 ?("0" + sec) : sec) + " " + ampm;
                } else {
                    return"" +
                        (hour < 10 ? ("0" + hour) : hour)+ ":" + (min < 10 ?("0" + min) : min) + ":" + (sec < 10 ?("0" + sec) : sec);
                }
            }

            //function to get the Date and format it correctly
            function getDate() {
                //make new date obj
                var dt = new Date
                // set the variables to the date propertys and slice them
                var DD = ("0" + dt.getDate()).slice(-2);
                var MM = ("0" + (dt.getMonth() + 1)).slice(-2);
                var YY = dt.getFullYear();
                var DAY = weekday[dt.getDay()];
                //return
                return "" + DAY + ", " + (DD + "." + MM + "." + YY );
            }

            //Event Listeners
            document.getElementById("formSettings").addEventListener("submit", function(){setSettings()});
            formSearch.addEventListener("submit", submitSearchQuery);