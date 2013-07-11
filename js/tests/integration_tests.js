module('integration tests', {
    setup: function() {
        Ember.testing = true;
        Ember.run(App, App.advanceReadiness);
    },
    teardown: function() {
        App.reset();
    }
});

test('view will render models in html table', function() {
    expect(3);
    visit("/").then(function() {
        ok(exists("table"), "the table of people was not rendered");
        equal(find("table tr:eq(0) td:eq(0)").text(), "matt morrison", "the first row was incorrect");
        equal(find("table tr:eq(1) td:eq(0)").text(), "toran billups", "the second row was incorrect");
    });
});

test('add will append another person to the html table', function() {
    expect(5);
    visit("/").then(function() {
        equal(find("table tr").length, 2, "the table of people was not complete");
        equal(find("table tr:eq(0) td:eq(0)").text(), "matt morrison", "the first row was incorrect");
        equal(find("table tr:eq(1) td:eq(0)").text(), "toran billups", "the second row was incorrect");
        fillIn(".firstName", "dustin");
        fillIn(".lastName", "thostenson");
        return click(".submit");
    }).then(function() {
        equal(find("table tr").length, 3, "the table of people was not complete");
        equal(find("table tr:eq(2) td:eq(0)").text(), "dustin thostenson", "dustin was not added to the html table");
    });
});

test('delete will remove the person for a given row', function() {
    expect(5);
    visit("/").then(function() {
        equal(find("table tr").length, 2, "the table of people was not complete");
        equal(find("table tr:eq(0) td:eq(0)").text(), "matt morrison", "the first row was incorrect");
        equal(find("table tr:eq(1) td:eq(0)").text(), "toran billups", "the second row was incorrect");
        return click("table .delete:first");
    }).then(function() {
        equal(find("table tr").length, 1, "the table of people was not complete");
        equal(find("table tr:eq(0) td:eq(0)").text(), "toran billups", "the wrong person was deleted");
    });
});
