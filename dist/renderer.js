class Renderer {
    renderData(allCityData) {
        console.log("START Renderer To ▼")
        console.log(allCityData)
        $("#container").empty()
        allCityData.forEach(c => {
            let source = $("#city-template").html()
            let template = Handlebars.compile(source);
            let newHTML = template(c);
            $('#container').append(newHTML);
        })
    }
}