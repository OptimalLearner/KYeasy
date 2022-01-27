/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class MyAssetContract extends Contract {

    async myAssetExists(ctx, myAssetId) {
        const buffer = await ctx.stub.getState(myAssetId);
        return (!!buffer && buffer.length > 0);
    }

    async createMyAsset(ctx, myAssetId, aadhar, pan, photo, loc1, loc2, ipaddress, vid_rec, bank) {

        let rd = {
            aadhar: aadhar,
            pan: pan,
            photo: photo,
            loc: {
                lat: loc1,
                long: loc2
            },
            vid_rec: vid_rec,
            ipaddress: ipaddress,
            bank: bank
        };
        //const asset = value ;
        const buffer = Buffer.from(JSON.stringify(rd));
        await ctx.stub.putState(myAssetId, buffer);
    }

    async readMyAsset(ctx, myAssetId) {
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        const buffer = await ctx.stub.getState(myAssetId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateMyAsset(ctx, myAssetId, aadhar, pan, bank) {
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        const asset = {
            aadhar: aadhar,
            pan: pan,
            bank: bank
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(myAssetId, buffer);
    }

    async deleteMyAsset(ctx, myAssetId) {
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        await ctx.stub.deleteState(myAssetId);
    }
    async GetQueryResultForQueryString(ctx, queryString) {

        let resultsIterator = await ctx.stub.getQueryResult(queryString);
        let results = await this._GetAllResults(resultsIterator, false);

        return JSON.stringify(results);
    }
    async QueryAssets(ctx, queryString) {
        return await this.GetQueryResultForQueryString(ctx, queryString);
    }
    async _GetAllResults(iterator, isHistory) {
        let allResults = [];
        let res = await iterator.next();
        while (!res.done) {
            if (res.value && res.value.value.toString()) {
                let jsonRes = {};
                console.log(res.value.value.toString('utf8'));
                if (isHistory && isHistory === true) {
                    jsonRes.TxId = res.value.txId;
                    jsonRes.Timestamp = res.value.timestamp;
                    try {
                        jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Value = res.value.value.toString('utf8');
                    }
                } else {
                    jsonRes.Key = res.value.key;
                    try {
                        jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        jsonRes.Record = res.value.value.toString('utf8');
                    }
                }
                allResults.push(jsonRes);
            }
            res = await iterator.next();
        }
        iterator.close();
        return allResults;
    }

}


module.exports = MyAssetContract;
