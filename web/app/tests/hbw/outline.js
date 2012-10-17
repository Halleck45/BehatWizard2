test('outline can be converted to string', function() {

    var outline1 = new hbw.entity.outline([
        {name:"Lepine",firstname:"jean-Francois"},
        {name:"Foo",firstname:"Bar"}
    ]);

    equal(outline1.asString(), "| Lepine | Jean-Francois |\n| Foo | Bar |", 'Example is converted to string');
});

test('Rows given to an outline node are checked', function() {

    var outline1 = new hbw.entity.outline();
    raises(function() {
        outline1.push('value1');
    }, null, 'Give invalid parameters to an outline node thhrows Exception')
});
