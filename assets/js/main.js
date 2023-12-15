/* TODOs: 
 - add slider below menu, manipulate and visualize data in ways
 - add popup on the map for clarity
 - check responsiveness in different screen sizes
 - 
*/ 
var map;

var pageContainer = document.querySelector(".page.container");

// buttons 
var homeButton = document.querySelector(".nav-home");
var learnButton = document.querySelector(".nav-learn");
var forumButton = document.querySelector(".nav-forum");
var brandButton = document.querySelector(".navbar-brand");

var randomFactBox = document.querySelector(".fact-box p");

var slider = document.querySelector("#yearSlider");
var sliderValue = document.querySelector("#yearVal");

// when slider value is changed 
slider.addEventListener("change", e => {
    sliderValue.innerHTML = e.target.value; 
    map.remove(); 
    if (localStorage.getItem("lat") && localStorage.getItem("long")) {
        mapInit(localStorage.getItem("lat"), localStorage.getItem("long"), 1, false);
    } else { 
        mapInit(35.499302, -80.848686, 1, false);
    }
})


if (localStorage.getItem("lat") && localStorage.getItem("long")) {
    mapInit(localStorage.getItem("lat"), localStorage.getItem("long")); 
}

if (!window.navigator.geolocation) {
    window.navigator.geolocation
    .getCurrentPosition(position => {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        localStorage.setItem("lat", lat);
        localStorage.setItem("long", long);
        mapInit(lat, long);
    }, e => {
        console.log(e); 
    });
}

// earthquake facts
var earthquakeFacts = [
    "Earthquakes can occur near the surface or deep below the surface.", 
    "The largest recorded earthquake in the United States (magnitude 9.2) struck Prince William Sound, Alaska, in March 1964.", 
    "The largest recorded earthquake in the world (magnitude 9.5) in Chile in May 1960.", 
    "'Moonquakes' are like earthquakes, but take place on the moon—they occur less frequently and with less intensity than they do here.",
    "'On average, magnitude 2 and smaller earthquakes occur several hundred times a day worldwide,' according to the Seismological Facility for the Advancement of Geoscience. 'Major earthquakes, greater than magnitude 7, happen more than once per month. 'Great earthquakes', magnitude 8 and higher, occur about once a year.'",
    "An 'epicenter' is defined as 'the part of the earth's surface directly above the focus of an earthquake.'",
    "90 percent of the world's earthquakes take place within the 40,000-kilometer path along the Pacific Ocean known as the 'Ring of Fire,' AKA the Circum-Pacific belt.",
    "The earth is made up of about 20 tectonic plates, and where they meet is called a 'plate boundary.' When plates grind into each other, earthquakes can occur.",
    "Earthquakes may cause seiches, which is when water is pushed 'from one end of a body of water to the other. When the wind stops, the water rebounds to the other side of the enclosed area. The water then continues to oscillate back and forth for hours or even days.'", 
    "'Statistically, there is an equal distribution of earthquakes in cold weather, hot weather, rainy weather, etc.,' according to the United States Geological Survey.",
    "Four of the top 20 largest earthquakes in the world took place in Alaska.",
    "The fewest amount of earthquakes in the United States take place in Florida and North Dakota.", 
    "You can select any month and day on the U.S. Geological Survey's website and see what past earthquakes happened on that day in history.", 
    "Those who study earthquakes are geophysicists.", 
    "Most earthquakes last only 10-30 seconds.", 
    "Of the earthquakes recorded in the last 4,000 years, the deadliest on record took place in China in January 1556—killing an estimated 830,000 people.", 
    "The seismic waves from this quake shook the earth for several days—something known as 'the free oscillation of the Earth.'",
    "A staggering number of 316,000 people were estimated as dead following this magnitude 7.0 quake—the deadliest in recent years.", 
    "This February, the earthquake that struck Turkey and Syria was magnitude 7.8 and killed more than 20,000 people.", 
    "In Ancient Greece, it was believed that earthquakes were caused by Poseidon.", 
    "There is a map from the United States Geological Survey that you can check out to stay updated on the most recent earthquakes magnitude 2.5+ around the world.", 
    "The hypocenter of an earthquake is the location beneath the earth's surface where the rupture of the fault begins.",
    "The epicenter of an earthquake is the location directly above the hypocenter on the surface of the earth.",
    "It is estimated that there are 500,000 detectable earthquakes in the world each year. 100,000 of those can be felt, and 100 of them cause damage.",
    "It is thought that more damage was done by the resulting fire after the 1906 San Francisco earthquake than by the earthquake itself.", 
    "From 1975-1995 there were only four states that did not have any earthquakes. They were: Florida, Iowa, North Dakota, and Wisconsin.", 
    "Most earthquakes occur at depths of less than 80 km (50 miles) from the Earth's surface.",
    "Florida and North Dakota have the smallest number of earthquakes in the United States.",
    "The deepest earthquakes typically occur at plate boundaries where the Earth”s crust is being subducted into the Earth's mantle. These occur as deep as 750 km (400 miles) below the surface.",
    "It was recognized as early as 350 BC by the Greek scientist Aristotle that soft ground shakes more than hard rock in an earthquake.",
    "Subduction is the process of the oceanic lithosphere colliding with and descending beneath the continental lithosphere.", 
    "In 1663 the European settlers experienced their first earthquake in America."
]
const randomFact = earthquakeFacts[Math.floor(Math.random() * earthquakeFacts.length)];
randomFactBox.innerHTML = randomFact; 

brandButton.addEventListener("click", e => {
    e.preventDefault();
    // localStorage.setItem("page", "home");
    window.location.hash = "";
    loadHome();
})

homeButton.addEventListener("click", e => {
    e.preventDefault();
    // localStorage.setItem("page", "home");
    window.location.hash = "";
    loadHome();
})

learnButton.addEventListener("click", e => {
    e.preventDefault();
    // localStorage.setItem("page", "learn");
    window.location.hash = "learn";
    loadLearn();
})

forumButton.addEventListener("click", e => {
    e.preventDefault(); 
    // localStorage.setItem("page", "forum");
    window.location.hash = "forum";
    loadForum();
})

function loadHome() {
    homeButton.classList.add("active"); 
    learnButton.classList.remove("active");
    forumButton.classList.remove("active");
    const randomFact = earthquakeFacts[Math.floor(Math.random() * earthquakeFacts.length)];

    var homeInner = `
    <div class="content container">
        <div class="top-box">
            <h3>About</h3>
            <p>SeismoRez is a website that has courses and forums to make the site interactive and educative related to being better prepared for earthquakes. Move along the Learn and Forum pages or the map on the right to learn more about earthquakes.</p>
        </div>
        <div class="fact-box top-box">
            <h3>Random Earthquake Fact: </h3>
            <p>"${randomFact}"</p>
        </div>
        <div class="courses">
            <h2>Recommended Courses</h2>
            <div class="course-boxes">
                <div class="course-box">
                    <p>Build your earthquake kit</p>
                    <a class="play btn btn-outline-primary" target="_blank" href="https://www.ready.gov/kids/games/data/bak-english/index.html">Start</a>
                </div>
                <div class="course-box">
                    <p>What to do while waiting for help</p>
                    <a class="play btn btn-outline-primary" target="_blank" href="https://www.ready.gov/kids/ready-2-help">Start</a>
                </div>
                <div class="course-box">
                    <p>Helping someone during an earthquake</p>
                    <a class="play btn btn-outline-primary" target="_blank" href="https://www.ready.gov/kids/games/data/dm-english/tsunami-earthquake.html">Start</a>
                </div>
            </div>
        </div>
    </div>

    <div class="map container">
        <div id="map"></div>
        <div class="slidecontainer">
            <input type="range" min="1900" max="2023" value="2023" class="slider" id="yearSlider">
            <p>Year: <span id="yearVal">2023</span></p>
        </div>
    </div>`
    pageContainer.innerHTML = homeInner;
    if (window.navigator.geolocation) {
        window.navigator.geolocation
        .getCurrentPosition(position => {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            mapInit(lat, long)
        }, e => {
            console.log(e); 
            mapInit(37.402179, 35.652607);
        });
    } 
}

function loadLearn() {
    homeButton.classList.remove("active"); 
    learnButton.classList.add("active");
    forumButton.classList.remove("active");
    const randomFact = earthquakeFacts[Math.floor(Math.random() * earthquakeFacts.length)];

    var learnInner = `
    <div class="content container">
        <div class="fact-box top-box">
            <h3>Random Earthquake Fact: </h3>
            <p>"${randomFact}"</p>
        </div>
        <div class="courses">
            <h2>Resources</h2>
            <div class="course-boxes">
                <div class="course-box">
                    <p>Earthquake FAQs</p>
                    <a class="play btn btn-outline-primary" target="_blank" href="https://www.usgs.gov/programs/earthquake-hazards/faqs-category">Start</a>
                </div>
                <div class="course-box">
                    <p>Earthquake related data</p>
                    <a class="play btn btn-outline-primary" target="_blank" href="https://www.usgs.gov/programs/earthquake-hazards/data">Start</a>
                </div>
                <div class="course-box">
                    <p>Interactive map with fault lines and recent earthquakes</p>
                    <a class="play btn btn-outline-primary" target="_blank" href="https://earthquake.usgs.gov/earthquakes/map/?extent=-77.3895,-165.23438&extent=79.43237,253.82813">Start</a>
                </div>
                <div class="course-box">
                    <p>Earthquake related maps</p>
                    <a class="play btn btn-outline-primary" target="_blank" href="https://www.usgs.gov/programs/earthquake-hazards/maps">Start</a>
                </div>
                <div class="course-box">
                    <p>Earthquake resources for college students</p>
                    <a class="play btn btn-outline-primary" target="_blank" href="https://earthquake.usgs.gov/education/search.php?sendLevelID=11">Start</a>
                </div>
                <div class="course-box">
                    <p>Build your earthquake kit</p>
                    <a class="play btn btn-outline-primary" target="_blank" href="https://www.ready.gov/kids/games/data/bak-english/index.html">Start</a>
                </div>
                <div class="course-box">
                    <p>What to do while waiting for help</p>
                    <a class="play btn btn-outline-primary" target="_blank" href="https://www.ready.gov/kids/ready-2-help">Start</a>
                </div>
                <div class="course-box">
                    <p>Helping someone during an earthquake</p>
                    <a class="play btn btn-outline-primary" target="_blank" href="https://www.ready.gov/kids/games/data/dm-english/tsunami-earthquake.html">Start</a>
                </div>
            </div>
        </div>
    </div>`
    // https://www.usgs.gov/programs/earthquake-hazards/maps
    pageContainer.innerHTML = learnInner;
}

function loadForum() {
    homeButton.classList.remove("active"); 
    learnButton.classList.remove("active");
    forumButton.classList.add("active");

    var forumInner = 
    `<div class="content container">
    <div class="row">
        <div class="col-md-12 post">
            <h2>Morocco earthquake: Latest updates & how to help</h2>
            <span class="author">By: <a href="https://www.reddit.com/user/TryWhistlin/">TryWhistlin</a></span>
            <p>Near midnight local time on Friday, a 6.8-magnitude earthquake hit the Al-Haouz region of Morocco. Government authorities and relief groups have already reported more than 1,000 deaths, with the toll climbing by the hour.</p>
            <p><a class="btn btn-primary" target="_blank" href="https://www.reddit.com/r/Earthquakes/comments/16efs3m/morocco_earthquake_latest_updates_how_to_help/" role="button">Read More &raquo;</a></p>
        </div>    
        <div class="col-md-12 post">
            <h2>10.0 earthquake movie question</h2>
            <span class="author">By: <a href="https://www.reddit.com/user/Agitated-Resource-13/">Agitated-Resource-13</a></span>
            <p>If someone has watched it. What do u think was scientifically wrong in the movie? And source would be greatly appreciated</p>
            <p><a class="btn btn-primary" target="_blank" href="https://www.reddit.com/r/Earthquakes/comments/182n8nq/100_earthquake_movie_question/" role="button">Read More &raquo;</a></p>
        </div>    
        <div class="col-md-12 post">
            <h2>Southern Italy: Terremoto - Earthquake (3.1 Md, at 18:41 UTC, from www.seismicportal.eu)</h2>
            <span class="author">By: <a href="https://www.reddit.com/user/BrainstormBot/">BrainstormBot</a></span>
            <p>🌖 Terremoto! Earthquake! 3.1 Md, registered by INGV, 2023-11-23 18:41:46 UTC (gibbous moon), on land, Bagnoli, Provincia di Napoli, Campania, Italy (40.83, 14.14) likely felt 40 km away (in Napoli, Pozzuoli, Giugliano in Campania, Marano di Napoli, Casoria…) by 3.1 million people (www.seismicportal.eu)</p>
            <p><a class="btn btn-primary" target="_blank" href="https://www.reddit.com/r/Earthquakes/comments/1828ci9/southern_italy_terremoto_earthquake_31_md_at_1841/" role="button">Read More &raquo;</a></p>
        </div>    
        <div class="col-md-12 post">
            <h2>The Great Alaska Earthquake of 1964 Documentary</h2>
            <span class="author">By: <a href="https://www.reddit.com/user/CryptoWiz99/">CryptoWiz99</a></span>
            <p>
                <iframe id="ytplayer" type="text/html" width="640" height="360"
                src="https://www.youtube.com/embed/jDdhgtZPzkA?autoplay=1&origin=http://example.com"
                frameborder="0"></iframe>
            </p>
            <p><a class="btn btn-primary" target="_blank" href="https://www.reddit.com/r/Earthquakes/comments/181wslf/the_great_alaska_earthquake_of_1964_documentary/" role="button">Read More &raquo;</a></p>
        </div>    
        <div class="col-md-12 post">
          <h2>🌍 Turkey: Deprem - Earthquake (5.6 M, at 14:46 UTC, from www.seismicportal.eu)</h2>
          <span class="author">By: <a href="https://www.reddit.com/user/BrainstormBot/">BrainstormBot</a></span>
          <p>🏠 Deprem! Earthquake! 5.6 M, registered by EMSC, 2023-11-23 14:46:07 UTC (gibbous moon), on land, Pütürge, Malatya, Turkey (38.2, 38.78) likely felt 220 km away (in Malatya, Battalgazi, Yeşilyurt, Elâzığ, Adıyaman…) by 2.8 million people (www.seismicportal.eu)</p>
          <p><a class="btn btn-primary" target="_blank" href="https://www.reddit.com/r/Earthquakes/comments/1822toz/turkey_deprem_earthquake_56_m_at_1446_utc_from/" role="button">Read More &raquo;</a></p>
        </div>  
      </div>`
      pageContainer.innerHTML = forumInner;
}

// if a current hash is present
if (window.location.hash == "#learn") {
    loadLearn();
}
else if (window.location.hash == "#forum") {
    loadForum();
}
else {
    loadHome();
}

// // store the previously visited page even if the page is reloaded
// if (localStorage.getItem("page") == "home") {
//     loadHome();
// } 
// else if (localStorage.getItem("page") == "learn") {
//     loadLearn();
// }
// else if (localStorage.getItem("page") == "forum") {
//     loadForum();
// }

function onEachFeature(feature, layer) {
    let popupContent = `<p>An earthquake with ${feature.properties.mag} magnitude in ${feature.properties.place}</p>`;

    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}

// initialize map 
function mapInit(lat, long, zoom=11, popup=true) {
    map = L.map('map').setView([lat, long], zoom);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
    }).addTo(map);

    if (popup) {
        L.popup([lat,long], 
            {content: '<p>Move around the map to see different regions. This map contains data for the history of the earthquakes that has taken place in the entire world that had a bigger magnitude than 7 (marked with markers). It also includes some risky areas in big red circles. You can close the popup!</p>'})
        .openOn(map);        
    }
    
    let riskyAreas = [[37.402179, 35.652607], [41.102179, 28.852607]]
    for (let riskyArea of riskyAreas) {
        let circle = L.circle(riskyArea, {   
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 80000
        }).addTo(map);
        circle.bindPopup("Risky area");
    }

    var latLangs = [
        [lat-0.1, long-0.1], [parseFloat(lat)+0.1, long-0.1], [parseFloat(lat)+0.1, parseFloat(long)+0.1], [lat-0.1, parseFloat(long)+0.1]
    ]
    let rect = L.polygon(latLangs, {   
        color: 'green',
    }).addTo(map);
    rect.bindPopup("Safe area")

    fetch("./locations.json")
        .then(response => response.json())
        .then((json) => {
            console.log(json.features); 
            data = []; 
            for (let feature of json.features) {
                let d = new Date(0); 
                d.setUTCMilliseconds(feature["properties"]["time"]);
                let year = d.getFullYear();
                if (sliderValue.innerHTML > year) {
                    data.push(feature); 
                }
            }
        
             json.features = data; 

            let features = L.geoJSON(json,{

                filter(feature, layer) {
                    if (feature.properties) {
                        let d = new Date(0); 
                        d.setUTCMilliseconds(feature["properties"]["time"]);
                        let year = d.getFullYear();
                        return year < sliderValue.innerHTML;
                        // If the property "underConstruction" exists and is true, return false (don't render features under construction)
                        return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
                    }
                    return false;
                },
        
                onEachFeature
            }).addTo(map);
        })
        console.log(map);
}