
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017/memberDb';

class MemberService{
    
    constructor(req, res){
        this.req = req
        this.res = res
    }

    insert(memberName, db, callback){
        db.collection('member').insertOne({
                "name" : memberName
        }, function(){
            callback()      
        })
    }

    addMember(){
        let self = this;
        let memberItem = this.req.body.memberItem;
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                self.insert(memberItem, db, function(){
                    db.close()
                    return self.res.status(200).json({
                        status: 'success'
                    })
                })
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }
    getMember(){
        let self = this;
        try{
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                let memberList = []
                let cursor = db.collection('member').find();
    
                cursor.each(function(err, doc) {
                  assert.equal(err, null);
                  if (doc != null) {
                    memberList.push(doc)
                  } else {
                    return self.res.status(200).json({
                        status: 'success',
                        data: memberList
                    })
                  }
                });
            });
        }
        catch(error){
            return self.res.status(500).json({
                status: 'error',
                error: error
            })
        }
    }

}
module.exports = MemberService