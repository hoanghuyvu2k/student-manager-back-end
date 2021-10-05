

module.exports = {
    create:async function(req,res){
        let name = req.body.name
        let form = req.body.form
        let data  = req.body.data
        let column = req.body.column
        await ListForm.create({name:name, form:form,data:data,column:column})
        res.json({ok:"ok"})
    }
    ,updateData: async function(req,res){
        let id = req.body.id
        let data = req.body.data
        if(req.body.form){
            await ListForm.update({id:id}).set({form:req.body.form, name:req.body.name,column:req.body.column })
            res.json()
        }
        else{
        let tmp = await DataForm.findOne({idForm :id})
        console.log("tmp la" + tmp )
        if(!tmp){
            await DataForm.create({idForm:req.body.id, data:req.body.data})
            console.log("da tao")
        }
        else {await DataForm.update({id:tmp.id}).set({data:data})
             console.log("da update")
        }
        res.json(data)
        }

    },
    getData: async function(req,res){
        let data= await DataForm.find({})
        console.log(data)
        res.json(data)

    },
    deleteForm: async function(req,res){
        let id = req.body.id
        await ListForm.destroy({id:id})
        await DataForm.destroy({idForm:id})
        res.json()
    }



};

