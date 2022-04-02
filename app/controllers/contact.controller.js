const Contact = require('../models/contact.model')

const mongoose = require("mongoose");
const {BadRequestError} = require("../errors");
const handlePromise = require("../helpers/promise.helper");

// exports.findAll = async (req, res) =>{
//     res.send({message: "findAll handler"});
// };

// exports.findOne = async (req, res) =>{
//     res.send({message: "findOne handler"});
// };

// exports.update = async (req, res) =>{
//     res.send({message: "update handler"});
// };

// exports.delete = async (req, res) =>{
//     res.send({message: "delete handler"});
// };

// exports.deleteAll = async (req, res) =>{
//     res.send({message: "deleteAll handler"});
// };

// exports.findAllFavorites = async (req, res) =>{
//     res.send({message: "findAllFavorites handler"});
// };


exports.create = async (req, res, next) =>{
    if(!req.body.name){
        return next(new BadRequestError(404,"Name can not be empty"));
    }

    // create a contact
    const contact = new Contact({
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        phone:req.body.phone,
        favorite:req.body.favorite === true,
    });

    const [error, document] = await handlePromise(contact.save());

    if(error) {
        return next(new BadRequestError(500,"An error occurred creating the contact"));
    }

    return res.send(document);

};


// Retrieve all constacts of a user from the database
exports.findAll = async (req, res, next) => {
    const condition = { };
    const { name } = req.query;
    if(name){
        condition.name = { $regex: new RegExp(name), $options: "i"};
    }

    const [error, documents] = await handlePromise(Contact.find(condition));

    if(error){
        return next(new BadRequestError(500,"An error occurred while retriecing contacts"));
    }

    return res.send(documents);

};

// find a single contact with an id 
exports.findOne = async (req, res, next) => {
    const {id} = req.params;
    
   const condition ={
       _id: id && mongoose.isValidObjectId(id) ? id: null,
   };

    const [error, document] = await handlePromise(Contact.findOne(condition));

    if(error){
        return next(new BadRequestError(500,`error retrieving contact with id ${req.params.id}`));
    }

    if(!document){
        return next(new BadRequestError(404,"Contact not found"));
    }

    return res.send(document);
};


// update a contact by the id is the request 
exports.update = async (req, res, next)=>{
    if(Object.keys(req.body).length===0){
        return next(new BadRequestError(400, 
            " Data to update can not be empty"));
    }

    const { id } = req.params;
    const condition ={
        _id: id && mongoose.isValidObjectId(id) ? id: null,
    };

    const [error, document] = await handlePromise(
        Contact.findOneAndUpdate(condition, req.body,{
            new: true,
        })

    );

    if(error){
        return next(new BadRequestError(500,
            `Error updating contact with id= ${req.params.id}`));
    }

    if(!document){
        return next(new BadRequestError(404,
            "Contact not found"));
    }

    return res.send({message:"Contact was update succefuly"});

};

// Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    const { id } = req.params;
    const condition = {
       _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    const [error, document] = await handlePromise(
      Contact.findOneAndDelete(condition)
    );
    if (error) {
       return next(new BadRequestError(500,
         `Could not delete contact with id=${req.params.id}`));
    }
    if (!document) {
       return next(new BadRequestError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was deleted successfully", });

};

// Find all favorite contacts of a user
exports.findAllFavorite = async (req, res, next) => {
    const [error, documents] = await handlePromise(
       Contact.find({ favorite: true, })
    );
    if (error) {
       return next(new BadRequestError(500,
          "An error occurred while retrieving favorite contacts"));
    }
    return res.send(documents);
};

// Delete alLL contacts of a user from the database
exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handlePromise(
      Contact.deleteMany({ })
    );
    if (error) {
      return next(new BadRequestError(500,
         "An error occurred while removing all contacts"));
    }
    return res.send ({
      message: `${data.deletedCount} contacts were deleted successfully`
    });
};