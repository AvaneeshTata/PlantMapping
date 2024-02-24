const cds = require('@sap/cds',);
const { PassThrough } = require('stream');
const XLSX = require('xlsx');
module.exports = cds.service.impl(async function () {

    let { plant, info, ExcelUpload } = this.entities;
    // var   data1 = [
    //     {
    //         plant: "testsdfghj",
    //         SBG: "sbuee",
    //         SBU: "sbueeff",
    //     },
    //     {
    //         plant: "fghjk",
    //         SBG: "cff",
    //         SBU: "cff",
    //     },
    //     {
    //         plant: "cfghj",
    //         SBG: "fghj",
    //         SBU: "ds",
    //     },];
    this.before('READ', info, async (req) => {
        let AribaSrv = await cds.connect.to("ARIBA_DEV")
             let resultOdata = await AribaSrv.tx(req).get("/opu/odata/sap/ZARB_BTP_PLANT_SRV_01/PlantSet?$format=json")
                console.log("start")
                console.log(resultOdata);
                console.log("end")
                const data = resultOdata;
                const entries = [];
                for (const entry of data) {
                    entries.push({
                        plant: entry.WERKS,
                        plant_info:entry.NAME1
                    })
                  }
                  await cds.tx(req).run(DELETE(info));
                  await cds.tx(req).run(INSERT.into(info).entries(entries));
      });
    this.on('PUT', ExcelUpload, async (req, next) => {
        if (req.data.excel) {
            var entity = req.headers.slug;
            const stream = new PassThrough();
            var buffers = [];
            req.data.excel.pipe(stream);
            await new Promise((resolve, reject) => {
                stream.on('data', dataChunk => {
                    buffers.push(dataChunk);
                });
                stream.on('end', async () => {
                    var buffer = Buffer.concat(buffers);
                    var workbook = XLSX.read(buffer, { type: "buffer", cellText: true, cellDates: true, dateNF: 'dd"."mm"."yyyy', cellNF: true, rawNumbers: false });
                    let data = []
                    const sheets = workbook.SheetNames
                    for (let i = 0; i < sheets.length; i++) {
                        const temp = XLSX.utils.sheet_to_json(
                            workbook.Sheets[workbook.SheetNames[i]], { cellText: true, cellDates: true, dateNF: 'dd"."mm"."yyyy', rawNumbers: false })
                        temp.forEach((res, index) => {
                            // if (index === 0) return;
                            data.push(JSON.parse(JSON.stringify(res)))
                        })
                    }
                    if (data) {
                        const responseCall = await CallEntity(entity, data);
                        if (responseCall == -1)
                            reject(req.error(400, JSON.stringify(data)));
                        else {
                            resolve(req.notify({
                                message: 'Upload Successful',
                                status: 200
                            }));
                        }
                    }
                });
            });
        } else {
            return next();
        }
    });

    //  srv.before('POST', 'Students', async (req) => {
    //        //Custom validations can be put, if required before upload
    //  });
    //  srv.on('POST', 'Students', async (req) => {
    //      //return reponse to excel upload entity .
    //     });

    async function CallEntity(entity, data) {
        var data1 = [];
        data.forEach(item => {
            data1.push({
                plant:item.Plant,
                SBG:item.SBG,
                SBU:item.SBU
            })
        });
        // if (entity === plant) {
           
          
        //     //If any custom handling required for a particular entity
        // }
        // const insertQuery = INSERT.into('PLANT_PROJ_PLANT').entries(data1); 
        const selectq = SELECT.from(plant);
        const insertQuery = INSERT.into(plant).entries(data1);
        // // This calls the service handler of respective entity. It can be used if any custom 
        // validations need to be performed. or else custom handlers can be skipped.
        // var valuess = await SELECT.from(plant); 
        // const insertResult = await INSERT.into(entity).entries(data);
        let srv = await cds.connect.to('db');
        const insertResult = await srv.run(insertQuery);
        const squery = await srv.run(selectq);
        // let query = SELECT.from(entity);
        // var query = await SELECT.from(plant);
        //  await srv.run(query);
        return insertResult; //returns response to excel upload entity

    };

});
