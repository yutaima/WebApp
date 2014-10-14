var LOCALTODO = function (tabs, listWrap) {

    var db = null;

    tabs = $(tabs);
    listWrap = $(listWrap);

    try {

        if (window.openDatabase) {
            db = openDatabase("tasks", "1.0", "Local todo list database", 2000000);
            if (db) {
                db.transaction(function (tx) {
                    tx.executeSql("CREATE TABLE IF NOT EXISTS tasklist (id INTEGER UNIQUE, task TEXT , list TEXT, completed BOOLEAN)",[],function (tx, results) {
                        tx.executeSql("SELECT * FROM tasklist", [], function(tx, results){

                            if (results.rows.length < 1) {
                                addTask("Click 'Add Meal' to add a new Meal", "home");
                                addTask("To delete or save meal, click on them to select them before clicking 'delete meal' or 'save meal' ", "work" );

                            }
                        });
                    });
                });


            } else {
                console.log("error occured when opening database");
            }

        } else {
            console.log("Web Database are not supported");

        }
    } catch(e) {
        console.log("error occured during db initialization.");


    }

    refresh();


    $("#addTask").click(function() {

        var list = $(".body .current");


        $("<li><input type='text' /><span class='button'> Add </span></li>")
            .find('span')
            .click(function() {
                var self = $(this);
                addTask(self.prev().val(), list.attr("id"));
                self.parent().remove();

            })
            .end()
            .prependTo(list.find("ul"));
    });

    $("#remTask").click(function() {
        removeTask($(".body .current span.select.selected").map(function(i , el) {
            return $(el).parent().attr('id');

        }).get());
    });



    $("#comTask").click(function() {
        completeTask($(".body .current span.select.selected").map(function(i , el) {
            return $(el).parent().attr('id');

        }).get());
    });


    function refresh () {
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM tasklist WHERE completed = ?" , [false], function(tx , results){
                var lists = [], i , len = results.rows.length,
                    tasks= {},
                    currList= "home";
                if (len > 0){
                    tabs.empty();
                    if (listWrap.children('.current').length > 0) {
                        currList = listWrap.children('.current').attr('id');
                    }
                    listWrap.empty();
                }
                for (i = 0; i < len; i++) {
                    var item = results.rows.item(i),
                        listName = item.list;
                    if (lists.indexOf(listName) < 0) {
                        lists.push(listName);
                        tasks[listName] = [];
                    }
                    tasks[listName].push(item);
                }

                $.each(lists, function(i, val) {
                    var listUl , j,
                        len = tasks[val].length,
                        currClass = (val === currList) ? "current" : "";


                    $("<li><a /</li>").find('a').attr("href", '#' + val).addClass(currClass).text(val).end().prependTo(tabs);
                    listUl = $("<ul />")


                    for (j = 0; j < len; j++) {
                        $("<li><span /></li>")
                            .attr("id", tasks[val][j].id)
                            .append(tasks[val][j].task)
                            .click(function() {
                                $('span', this).toggleClass("selected");

                            })
                            .find('span')
                            .addClass("select")
                            .end()
                            .appendTo(listUl);


                    }
                    listUl
                        .wrap('<div />')
                        .parent("div")
                        .attr('id', val)
                        .addClass(currClass)
                        .appendTo(listWrap);
                });
            });
        });
    }
    function addTask (task, list){
        db.transaction(function(tx){
            tx.executeSql("INSERT INTO tasklist (id, task, list, completed) VALUES (?, ?, ?, ?)", [+new Date(),task, list, false], function (tx, results){
                refresh();
            });

        });

    }
    function removeTask(taskId) {
        var query = [], i;


        if (typeof taskId === 'string' || typeof taskId === 'number') {
            taskId = [taskId];

        }
        for (i = 0; i < taskId.length; i++) {
            query.push("id = " + taskId[i]);

        }
        query = "DELETE FROM tasklist WHERE" + query.join(" or");

        db.transaction(function(tx){
            tx.executeSql(query, [], function() {
                refresh();

            })



        });
    }
    function completeTask(taskId){
        var query = [], i;


        if (typeof taskId === 'string' || typeof taskId === 'number') {
            taskId = [taskId];

        }
        for (i = 0; i < taskId.length; i++) {
            query.push("id = " + taskId[i]);

        }
        query = "UPDATE tasklist SET completed = 'true' WHERE " + query.join(" or");

        db.transaction(function(tx) {
            tx.executeSql(query, [], function() {
                refresh();

            })



        });
    }
};