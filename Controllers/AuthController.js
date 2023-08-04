const User = require("../Models/UserModel.js")
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    // const { email, password, username, createdAt } = req.body;
    const { email, password, username, createdAt, overview, tagline, workExperience, skills, projects, socialMediaLinks, testimonials,project_desc, about_desc, services,} = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    // const user = await User.create({ email, password, username, createdAt });
    const user = await User.create({ email, password, username, createdAt, overview, tagline, workExperience, skills, projects, socialMediaLinks, testimonials,about_desc, project_desc, services,  });

    const token = createSecretToken(user?._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};


module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token = createSecretToken(user._id);
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: false,
       });
       res.status(201).json({ message: "User logged in successfully", success: true });
       next()
    } catch (error) {
      console.error(error);
    }
  }

  // auth controller file
// Other controller functions here...

module.exports.GetUserDetails = async (req, res, next) => {
  try {
    // Access the authenticated user object from the request
    // const user = await User.findById(req.user._id);
    // console.log('the user is', req.user)

    // const user = req.user;

        // Access the authenticated user ID from the request
        const userId = req.user._id;

        // Fetch the user data from the database using the user ID
        const user = await User.findById(userId);

    // Return the user details in the response
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.GetPublicUserDetails = async (req, res) => {
  try {
    // Access the authenticated user object from the request
    // const user = await User.findById(req.user._id);
    // console.log('the user is', req.user)

    // const user = req.user;

        // Access the authenticated user ID from the request
        const userId = req.query.userId;

        // Fetch the user data from the database using the user ID
        const user = await User.findById(userId);
        console.log(user)

    // Return the user details in the response
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



  module.exports.Update = async (req, res, next) => {
    // try {
    //   const { overview, workExperience, skills, projects, socialMediaLinks, testimonials,about_desc, project_desc, services,  } = req.body;
    //   // Get the authenticated user's ID from the request
    //   const userId = req.user.id;
    //   console.log(userId)
  
    //   // Find the user by ID and update the new sections
    //   const updatedUser = await User.findByIdAndUpdate(
    //     userId,
    //     { overview, workExperience, skills, projects, socialMediaLinks, testimonials,about_desc, project_desc, services, },
    //     { new: true } // Return the updated document
    //   );
  
    //   res.status(200).json({ success: true, user: updatedUser });
    // } catch (error) {
    //   console.error(error);
    // }



    try {
      const { email, password, username, about_desc, tagline, workExperience, skills, projects, socialMediaLinks, testimonials, project_desc, services } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          email,
          password,
          username,
          about_desc,
          tagline,
          workExperience,
          skills,
          projects,
          socialMediaLinks,
          testimonials,
          project_desc,
          services,
        },
        { new: true }
      );
      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error updating user data" });
    }
  };



  // module.exports.Update = async (req, res, next) => {
  //   try {
  //     const { overview, workExperience, skills, projects, socialMediaLinks, testimonials } = req.body;
  
  //     // Get the authenticated user's ID from the request
  //     const userId = req.user._id;
  
  //     // Find the user by ID and update the profile details
  //     const updatedUser = await User.findByIdAndUpdate(
  //       userId,
  //       { overview, workExperience, skills, projects, socialMediaLinks, testimonials },
  //       { new: true } // Return the updated document
  //     );
  
  //     // Check if the user was found and updated
  //     if (!updatedUser) {
  //       return res.status(404).json({ message: "User not found" });
  //     }
  
  //     // Return the updated user information in the response
  //     res.status(200).json({ success: true, user: updatedUser });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // };

  
  
  
  
  
  
  