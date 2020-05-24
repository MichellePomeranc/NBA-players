class Renderer {

    renderRoster(data) {
        $('#teamInput').empty()
        let source = $('#roster-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({ data });
        $('.roster-container').append(newHTML);
    }
}

const r = new Renderer