document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();

function exists(selector) {
    return !!find(selector).length;
}

function stubEndpointForHttpRequest(server, people) {
    var json = JSON.stringify(people);
    var content = {"Content-Type": "application/json"};
    server.respondWith("GET", "/api/people", function(request) {
        Ember.run(function() {
            request.respond(200, content, json);
        });
    });
}
