const users = require('../models/userSchema')
const moment = require('moment')
const csv = require("fast-csv");
const fs = require("fs");
const path = require("path");
const { Parser } = require('json2csv');


exports.userpost = async(req,res)=>{
    const {fname, lname, email, mobile, gender, status,location}= req.body;

    if(!fname || !lname || !email || !mobile || !gender || !status || !location)
    {
        return res.status(401).json({mesage:"all fields required"});
    }
    try {
        const userExist = await users.findOne({email:email});
        if(userExist)
        {
            return res.status(401).json({message:"user already exist"})
        }
        console.log(userExist)
        const dateCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss"); 
        const userData = new users({fname, lname, email, mobile, gender, status,location,dateCreated});
        
        await userData.save();
        console.log(userData)
        return res.status(200).json(userData);
        

    } catch (error) {
        console.error("Error saving user data:", error); // Log the full error object
        return res.status(500).json({ message: error.message || "An error occurred", error }); // Return the error object for more details
    }

};

exports.userget = async(req,res)=>{

    const search = req.query.search || ""
    const gender = req.query.gender || ""
    const status = req.query.status || ""
    const sort = req.query.sort || "new"
    const page = req.query.page || 1
    const item_per_page = 4;

    console.log("Received status:", status);

    const query={};
    if (status && status !== "All") {
        query.status = status; // Ensure the query filters by status
    }

    if(search) 
    {
        query.fname= {$regex: search, $options:"i"}
    }
    if(gender && gender !== "All")
    {
        query.gender= gender;
    }

    if(status && status!=="All")
    {
        query.status=status;
    }

    try {

        const skip = (page-1)*item_per_page;
        const count = await users.countDocuments(query);
        const sortOption = sort === "new" ? -1 : 1;
        const userData = await users.find(query)
        .sort({dateCreated:sortOption})
        .limit(item_per_page)
        .skip(skip);
        console.log("backend",userData);
        
        const pageCount = Math.ceil(count/item_per_page)

        return res.status(200).json({Pagination: {count, pageCount},userData})

    } catch (error) {
        return res.status(401).json(error)
    }
    
}


exports.singleuserget = async (req, res) => {
    const { id } = req.params;
    try {
        const userData = await users.findById(id);
        if (userData) {
            return res.status(200).json(userData); // Correctly using res.status to send the response
        } else {
            return res.status(404).json({ message: "User not found" }); // Handle case where user is not found
        }
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "Server error", error }); // Correct error handling with res
    }
};


exports.useredit = async(req,res)=>{
    const {id}=req.params;
    const {fname, lname, email, mobile, gender, status,location}= req.body;

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    try {
        const updateuser = await users.findByIdAndUpdate({_id:id},{fname, lname, email, mobile, gender, status,location,dateUpdated},{new: true});
        await updateuser.save();
        return res.status(200).json(updateuser);
    } catch (error) {
        return res.status(401).json(error)
    }
}

exports.userdelete = async(req,res)=>{
    const {id}= req.params;
    try {
        const deleteUser = await users.findByIdAndDelete({_id:id})
        return res.status(200).json({message:"user deleted"})
    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.userStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Update the status of the user with the specified ID
        const statusChange = await users.findByIdAndUpdate(
            { _id: id }, 
            { status: status }, 
            { new: true } 
        );
        console.log("backend status", statusChange)
        // Send a success response with the updated user status
        return res.status(200).json(statusChange);
    } catch (error) {
        // Send an error response in case of failure
        return res.status(401).json(error);
    }
};


exports.userExport = async (req, res) => {
    try {
        const userList = await users.find(); // Fetch users
        console.log("Fetched users:", userList);

        const csvData = userList.map(user => {
            return [
                user.fname || '',
                user.lname || '',
                user.email || '',
                user.mobile || '',
                user.gender || '',
                user.status || '',
                user.location || '',
                user.dateCreated ? moment(user.dateCreated).format('YYYY-MM-DD') : '',
                user.dateUpdated ? moment(user.dateUpdated).format('YYYY-MM-DD') : ''
            ].join(',');
        });

        const csvHeader = 'FirstName,LastName,Email,Phone,Gender,Status,Location,DateCreated,DateUpdated';
        const finalCsv = `${csvHeader}\n${csvData.join('\n')}`;

        const filePath = path.join(__dirname, '../public/files/export/user_data.csv');
        console.log("CSV file path:", filePath);
        fs.writeFileSync(filePath, finalCsv); // Write the CSV file

        // Check if the file was created successfully
        if (fs.existsSync(filePath)) {
            console.log("CSV file created successfully:", filePath);
            // Set headers for file download
            res.setHeader('Content-Disposition', 'attachment; filename="user_data.csv"');
            res.setHeader('Content-Type', 'text/csv');
            return res.status(200).download(filePath); // Send the CSV file to the client
        } else {
            console.error("Failed to create CSV file");
            return res.status(500).send("Failed to create CSV file");
        }
    } catch (error) {
        console.error("Error exporting user data:", error);
        return res.status(500).send("Error exporting data");
    }
};

