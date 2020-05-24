const getRoster = function () {
    let input = $("#teamInput").val()

    $.get(`/teams/${input}`, function (data) {
        console.log({ data })
        r.renderRoster(data)
    })
}