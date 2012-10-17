test('Step can be converted to string', function() {

    var step1 = new hbw.entity.step({type:'given',text:'example of description'});

    equal(step1.asString(), '\n    given example of description', 'Step is converted to string');
});