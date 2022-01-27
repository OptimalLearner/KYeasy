        let rd = {
            aadhar: "aadhar",
            pan: "pan",
            photo: "photo",
            loc: "loc",
            vid_rec: "vid_rec",
            ipaddress: "ipaddress",
            banks: {
                bank:
            }
        };
        //const asset = value ;
        const buffer = Buffer.from(JSON.stringify(rd));
        console.log(buffer.toString())
        //await ctx.stub.putState(myAssetId, buffer);