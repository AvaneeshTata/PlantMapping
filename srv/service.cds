using {plant_proj as my} from '../db/schema';

service MyService {
    @cds.persistence.skip
    @odata.singleton
    entity ExcelUpload {
        @Core.MediaType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        excel : LargeBinary;
    };


    //  @odata.draft.enabled
    // @cds.security.draftProtection.enabled:false
    // @fiori.draft.enabled
    entity plant as projection on my.plant;
    entity info  as projection on my.info;

}
