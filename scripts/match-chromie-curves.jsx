#target photoshop

// Curves to match REF CHROMIEE. Numbers from the screenshots:
// black knit / forehead / background beige.
// Input = your file, Output = the ref. Edit here if Info differs.

var LAYER_NAME = "REF CHROMIEE";

var RED = [
    [0, 0],
    [2, 25],
    [121, 124],
    [207, 224],
    [255, 255]
];

var GREEN = [
    [0, 0],
    [43, 38],
    [96, 95],
    [176, 195],
    [255, 255]
];

var BLUE = [
    [0, 0],
    [53, 46],
    [65, 57],
    [155, 172],
    [255, 255]
];

if (app.documents.length === 0) {
    alert("Open the photo first.");
} else if (app.activeDocument.mode !== DocumentMode.RGB) {
    alert("Need an RGB file.");
} else {
    app.activeDocument.suspendHistory(LAYER_NAME, "applyChromieCurves()");
}

function applyChromieCurves() {
    makeEmptyCurvesLayer();
    setRgbCurves(RED, GREEN, BLUE);
    app.activeDocument.activeLayer.name = LAYER_NAME;
}

function makeEmptyCurvesLayer() {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass(charIDToTypeID("AdjL"));
    desc.putReference(charIDToTypeID("null"), ref);

    var used = new ActionDescriptor();
    var curvesType = new ActionDescriptor();
    curvesType.putEnumerated(
        stringIDToTypeID("presetKind"),
        stringIDToTypeID("presetKindType"),
        stringIDToTypeID("presetKindDefault")
    );
    used.putObject(charIDToTypeID("Type"), charIDToTypeID("Crvs"), curvesType);
    desc.putObject(charIDToTypeID("Usng"), charIDToTypeID("AdjL"), used);
    executeAction(charIDToTypeID("Mk  "), desc, DialogModes.NO);
}

function setRgbCurves(redPts, greenPts, bluePts) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(
        stringIDToTypeID("adjustmentLayer"),
        stringIDToTypeID("ordinal"),
        stringIDToTypeID("targetEnum")
    );
    desc.putReference(stringIDToTypeID("null"), ref);

    var curves = new ActionDescriptor();
    var list = new ActionList();
    list.putObject(stringIDToTypeID("curvesAdjustment"), channelCurve("red", redPts));
    list.putObject(stringIDToTypeID("curvesAdjustment"), channelCurve("green", greenPts));
    list.putObject(stringIDToTypeID("curvesAdjustment"), channelCurve("blue", bluePts));
    curves.putList(stringIDToTypeID("adjustment"), list);

    desc.putObject(stringIDToTypeID("to"), stringIDToTypeID("curves"), curves);
    executeAction(stringIDToTypeID("set"), desc, DialogModes.NO);
}

function channelCurve(channelName, points) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(
        stringIDToTypeID("channel"),
        stringIDToTypeID("channel"),
        stringIDToTypeID(channelName)
    );
    desc.putReference(stringIDToTypeID("channel"), ref);

    var pts = new ActionList();
    for (var i = 0; i < points.length; i++) {
        var pt = new ActionDescriptor();
        pt.putDouble(charIDToTypeID("Hrzn"), points[i][0]);
        pt.putDouble(charIDToTypeID("Vrtc"), points[i][1]);
        pts.putObject(charIDToTypeID("Pnt "), pt);
    }
    desc.putList(stringIDToTypeID("curve"), pts);
    return desc;
}
