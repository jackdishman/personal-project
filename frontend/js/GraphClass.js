class GraphClass {

    constructor(god) {
        this.G = new jsnx.Graph();
        this.god = god;
        this.godColor = "#black";
        this.firstColor = "#d2b48c";
        this.secondColor = "white";
        this.nodeList = [];
        this.nodeList.push(god.id);

        this.G.addNode(god.id, {
            user: this.god,
            label: this.god.name,
            id: this.god.id,
            color: this.godColor,
        });
    }


    //generates connects for a specific node that arent already on the graph.
    //input: origin=desired node to populate connects
    populateConnects(origin, connectColor) {
        for (var i in origin.connectionList) {
            var u = origin.connectionList[i];
            if (u.id != origin.id && !this.nodeList.includes(u.id)) {
                this.G.addNode(u.id, {
                    user: u,
                    label: u.name,
                    id: u.id,
                    color: connectColor,
                });
                this.nodeList.push(u.id);
            }
            this.G.addEdge(u.id, origin.id);
        }
    }



    generateFullGraph() {
        //connect friends of friends
        this.populateConnects(this.god, this.firstColor);
        for (var i in this.god.connectionList) {
            this.populateConnects(this.god.connectionList[i], this.secondColor);
        }
        this.drawGraph(this.G);
    }


    //input: another user
    //output: graph of mutual friends
    generateMutualGraph(u) {
        this.G.addNode(u.id, {
            user: u,
            label: u.name,
            id: u.id,
            color: this.godColor
        });

        var uList = this.god.getFirstConnectList(u);
        for (var i in uList) {
            var m = uList[i];
            this.G.addNode(m.id, {
                user: m,
                label: m.name,
                id: u.id,
                color: this.firstColor
            });
            this.G.addEdge(m.id, this.god.id);
            this.G.addEdge(m.id, u.id);
        }
        this.drawGraph(this.G);
    }

    drawGraph(graph) {
        jsnx.draw(graph, {
            element: '#graph',
            withLabels: true,
            labels: 'label',
            nodeStyle: {
                fill: function(d) {
                    return d.data.color;
                },
                r: 15,
            },
            nodeAttr: {
                id: function(d) {
                    return d.id
                }
            },
            labelStyle: {
                fill: "red",
            },
            edgeStyle: {
                'stroke-width': 3
            }
        }, true);
    }

}