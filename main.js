//0b965519-378f-4de1-ab3e-c725ecedead3
const pollutionScale = [
    {
      scale: [0, 50],
      quality: "Good",
      src: "happy",
      background: "linear-gradient(to right, #45B649, #DCE35B)",
    },
    {
      scale: [51, 100],
      quality: "Moderate",
      src: "thinking",
      background: "linear-gradient(to right, #F3F9A7, #CAC531)",
    },
    {
      scale: [101, 150],
      quality: "Unhealthy",
      src: "unhealthy",
      background: "linear-gradient(to right, #F16529, #E44D26)",
    },
    {
      scale: [151, 200],
      quality: "Bad",
      src: "bad",
      background: "linear-gradient(to right, #ef473a, #cb2d3e)",
    },
    {
      scale: [201, 300],
      quality: "Very bad",
      src: "mask",
      background: "linear-gradient(to right, #8E54E9, #4776E6)",
    },
    {
      scale: [301, 500],
      quality: "Terrible",
      src: "terrible",
      background: "linear-gradient(to right, #7a2828, #a73737)",
    },
  ];

  const loader = document.querySelector(".loader");
  const userInformation = document.querySelector(".user-information");
  const cityName = document.querySelector(".city-name");
  const pollutionInfo = document.querySelector(".pollution-info");
  const pollutionValue = document.querySelector(".pollution-value");
  const emojiLogo = document.querySelector(".emoji-logo");
  const backgroundLayer = document.querySelector(".background-layer");
  const locationPointer = document.querySelector(".location-pointer");

  async function getDataPollution(url){

    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Error ${response.status}, ${response.statusText}`);
        }
        else {
            let dataPollution = await response.json();
            let aqi = dataPollution.data.current.pollution.aqius;
            const sortedData = {
                city: dataPollution.data.city,
                aqi,
                ...pollutionScale.find(obj => aqi >= obj.scale[0] && aqi <= obj.scale[1])
            }
            populateUI(sortedData);
        }
    }
    catch(error) {
        loader.classList.remove("active");
        emojiLogo.src = "./ressources/browser.svg";
        userInformation.textContent = error.message;
    }
  }

  getDataPollution("https://api.airvisual.com/v2/nearest_city?key=0b965519-378f-4de1-ab3e-c725ecedead3");

  function populateUI(data){
    console.log(data);
    emojiLogo.src = `./ressources/${data.src}.svg`;
    userInformation.textContent = `Here is ${data.city} situation`;
    cityName.textContent = `${data.city}`;
    pollutionInfo.textContent = `${data.quality}`;
    pollutionValue.textContent = `${data.aqi}`;
    backgroundLayer.style.backgroundImage = data.background;
    loader.classList.remove("active");
    pointerPlacement(data.aqi);
  }

  function pointerPlacement(AQIValue){
    const widthParent = locationPointer.parentElement.scrollWidth;
    locationPointer.style.transform = `translateX(${(AQIValue / 500) * widthParent}px) rotate(180deg)`;
  }

