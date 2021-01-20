/// <reference path="bpmn-modeler.min.js" />
window.bpmnModeler = {

    modelers: new Object(),

    create: function (namedInstance, canvas) {
        this.modelers[namedInstance] = new BpmnJS({
            container: canvas,
            keyboard: {
                bindTo: window
            }
        });
    },

    exportDiagram: function (namedInstance) {
        this.modelers[namedInstance].saveXML({ format: true }, function (err, xml) {
            if (err) {
                return console.error('could not save BPMN 2.0 diagram', err);
            }
            alert('Diagram exported. Check the developer tools!');
            console.log('DIAGRAM', xml);
        });
    },

    openDiagram: function(namedInstance, bpmnXML) {
        // import diagram
        this.modelers[namedInstance].importXML(bpmnXML);
            /*
            // access modeler components
            var canvas = this.modelers[namedInstance].get('canvas');
            var overlays = this.modelers[namedInstance].get('overlays');
            // zoom to fit full viewport
            canvas.zoom('fit-viewport');
            // attach an overlay to a node
            overlays.add('SCAN_OK', 'note', {
                position: {
                    bottom: 0,
                    right: 0
                },
                html: '<div class="diagram-note">Mixed up the labels?</div>'
            });
            // add marker
            canvas.addMarker('SCAN_OK', 'needs-discussion');
            */
    }
}