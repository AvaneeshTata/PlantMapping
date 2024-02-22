namespace plant_proj;
using { managed } from '@sap/cds/common';


entity plant:managed{
   
    key plant:String;
    SBG:String ;
    SBU:String ;
}

entity info{
key  plant:String @Common.Label:'Plant';
    plant_info:String @Common.Label:'Name';
    // SBG:String;
    // SBU:String;
}
