const manager = new TempManager(new Renderer())

manager.getDataFromDB()

const handleSearch = async () => {
    let cityInput = $("#city-input").val()
    if (cityInput) {
        await manager.getCityData(cityInput)
        await manager.getDataFromDB()
    } else { alert("Search line is empty") }
}

$("body").on("click", ".saveCityBut", async function () {
    let cityName = $(this).closest('.box').data().id
    manager.saveCity(cityName)
    console.log("save "+ cityName)
})

$("body").on("click", ".removeCityBut", async function () {
    let cityName = $(this).closest('.box').data().id
    console.log(cityName)
    await manager.removeCity(cityName)
    await manager.getDataFromDB()
    console.log("remove "+ cityName)
})

$("body").on("click", ".refresh", async function (){
    let cityName = $(this).closest('.box').data().id
    await manager.removeCity(cityName)
    await manager.getCityData(cityName)
    await manager.saveCity(cityName)
    await manager.getDataFromDB()
    console.log("refresh "+ cityName)
})