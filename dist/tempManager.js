class TempManager {
    constructor(renderer) {
        this.renderer = renderer
        this.cityData = []
    }
    async getDataFromDB() {
        await $.get(`cities`, (cities = []) => {
            (cities||[]).forEach(f => {
                this.cityData.forEach(c => {
                    if (f.name === c.name) {
                        this.cityData = this.cityData.filter(f => f.name !== c.name)
                    }
                })
                this.cityData.push(f)
            })
            this.renderer.renderData(this.cityData)
        })

    }
    async getCityData(cityName) {
        let newCityName = cityName.charAt(0).toUpperCase() + cityName.substr(1).toLowerCase();
        const listOfCities = this.cityData.filter(f => f.name !== newCityName)
        let data = await $.get(`city/${newCityName}`)
        listOfCities.push(data)
        this.cityData = listOfCities
    }
    async saveCity(cityName) {
        let city = this.cityData.find(c => c.name == cityName)
        await $.post(`city`, city, (response) => { })
    }
    async removeCity(cityName) {
        this.cityData = this.cityData.filter(f => f.name !== cityName)
        await $.ajax({
            url: `city/${cityName}`,
            type: 'DELETE',
            success: function (result) {
                console.log("success response From removeCity " + cityName)
            },
            error: function (result) {
                console.log("error From removeCity " + result)
            }
        })
    }
}