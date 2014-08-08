require.config({
    paths: {
        'knockout': '../Scripts/knockout-3.1.0.debug',
    }
});

require(['../App/viewmodels/person', 'knockout'], function(Person,ko) {
    describe('Person',function() {
        it('Should populate name', function () {
            var personUnderTest = new Person('test', false, 'Rock', ko.observableArray([]));
            expect(personUnderTest.name()).toBe('test');
        });
    });
});