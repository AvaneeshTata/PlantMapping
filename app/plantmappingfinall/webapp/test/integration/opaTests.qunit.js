sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'plantmappingfinall/test/integration/FirstJourney',
		'plantmappingfinall/test/integration/pages/plantList',
		'plantmappingfinall/test/integration/pages/plantObjectPage'
    ],
    function(JourneyRunner, opaJourney, plantList, plantObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('plantmappingfinall') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheplantList: plantList,
					onTheplantObjectPage: plantObjectPage
                }
            },
            opaJourney.run
        );
    }
);